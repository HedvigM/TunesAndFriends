"use client";
import {
    withPageAuthRequired,
    WithPageAuthRequiredProps,
  } from "@auth0/nextjs-auth0";
  import { NextPage } from "next";
  import {
    ContentContainer,
    LogoContainer,
    OuterAppContainer,
    StickyMenuContainer,
  } from "styles/layout";
  import { Header } from "components/Header";
import { Menu } from "components/Menu";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { getTunesByUserId } from "lib/api/tunes";
import { TUNE_URL } from "utils/urls";
import { getMyCache } from "services/functions";
import { colors } from "styles/theme";
import { TuneListWithTags } from "components/TuneListWithTag";
import styled from "@emotion/styled";
import { Button } from "styles/Button";

export type TuneObject = {
    id: number;
    sessionId: number;
    name: string;
    tags: { id: number; name: string }[];
}

const myTunes: NextPage<{}> = () => {
    const [tunes, setTunes] = useState<any[]>([]);
    const [tuneObjects, setTuneObjects] = useState<TuneObject[]>([]);
    const { user } = useUser();
    const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
    const [sortTag, setSortTag] = useState("")

    console.log({ tuneObjects });

    useEffect(() => {
        console.log({ user });
        if (user) {
            const fetchTunes = async () => {
                const tunes = await getTunesByUserId(user.sub as string);
                if (tunes.success) {
                    setTunes(tunes.data);
                }
            };
            fetchTunes();
        }
    }, [user]);

    useEffect(() => {
        if (tunes && tunes.length > 0) {
          Promise.all(
            tunes.map((tune) =>
              getMyCache(TUNE_URL(tune.sessionId)).then((response) => {
                return {
                  id: tune.id,
                  sessionId: tune.sessionId,
                  name: response.name,
                  tags: tune.tags
                };
              })
            )
          ).then((tuneObjectsData) => {
            setTuneObjects(tuneObjectsData);

            const allTags = tuneObjectsData.flatMap((tune) => tune.tags);
            const uniqueTags = allTags.filter((tag, index, self) =>
              index === self.findIndex((filterTag) => filterTag.id === tag.id)
            );
            setTags(uniqueTags);
          });
        }
      }, [tunes]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <OuterAppContainer>
        <LogoContainer>
          <Header textAlign="left" size="small" color="blue">
            T&F
          </Header>
        </LogoContainer>
        <ContentContainer>
        <div
            style={{
            padding: "20px 20px 0px 20px",
            height: "100%",
            }}
         >
        <div style={{paddingBottom: "20px"}}>
            <Header size="small" textAlign="center" color="blue">
             My tunes
            </Header>
        </div>
        <div style={{paddingBottom: "20px", display: "flex", gap: "10px", alignItems: "center"}}>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>Tags:</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                {tags.map((tag) => (
                    <Button
                    active={tag.name === sortTag}
                    key={tag.id}
                    onClick={() => setSortTag(tag.name === sortTag ? "" : tag.name)}
                    > {tag.name}
                    </Button>
                ))}
            </div>
        </div>

        <div style={{ display: "flex",flexDirection: "column", width: "100%", gap: "2px" }}>
        {tuneObjects
          .filter((tune) => !sortTag || tune.tags?.some((tag) => tag.name === sortTag))
          .map((tune) => (
             <TuneListWithTags key={tune.sessionId} tune={tune} sortTag={sortTag} />
        ))}
    </div>
    </div>
    </ContentContainer>
    <StickyMenuContainer>
        <Menu />
    </StickyMenuContainer>
    </OuterAppContainer>
    );
};

type TagStyledProps = {
    active: boolean;
}

const StyledButton = styled("button", {
    shouldForwardProp: (prop: any) => prop !== "active",
  })<TagStyledProps>((props: TagStyledProps) => ({
    backgroundColor: props.active ? "inherit" : colors.first,
    padding: "5px 10px",
    border: `1px solid ${colors.first}`,
    borderRadius: "3px",

    "&:hover": {
      cursor: "pointer",
    },
  }));
export default withPageAuthRequired<WithPageAuthRequiredProps>(myTunes);

