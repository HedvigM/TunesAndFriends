"use client";
import { TuneObject } from "types/tune";


type TuneListWithTagsProps = {
    tune: TuneObject;
    sortTag: string;
}

export const TuneListWithTags = (props: TuneListWithTagsProps) => {

    return (
            <div
            key={props.tune.sessionId}
            style={{
                display: "flex",
                gap: "2px",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 0",
            }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <p style={{ margin: "0", padding: "0" }}>{props.tune.name}</p>

                <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
                    {props.tune.tags?.length > 0 && props.tune.tags?.map((tag: { name: string }) =>
                    tag.name && tag.name.length > 0 && (

                    <p
                    key={tag.name}
                    style={{
                    margin: "0",
                    padding: "2px 3px",
                    fontSize: "12px",
                    borderRadius: "5px",
                    width: "fit-content",
                    display: "inline-block",
                    backgroundColor: `${tag.name === props.sortTag ? "var(--color-secondary)" : "var(--color-primary)"}`
                    }}>
                        {tag.name}
                    </p>
            ))}
            </div>
            </div>
            <form style={{ display: "flex", gap: "5px" }}>

                <input type="text" name="tag" />
                <button name="tuneId" value={props.tune.id}>Save tag</button>

            </form>
            </div>
    )
}

export default TuneListWithTags;