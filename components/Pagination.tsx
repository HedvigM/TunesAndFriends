import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { Button } from "styles/Button";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function UsePagination() {
  const { items } = usePagination({
    count: 10,
  });

  /* TODO: kolla så denna verkligen funkar.  */
  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, onClick, ...item }, index) => {
          let children = null;
          console.log({ page });
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <>
                {/* <Link href={'/tunes/3'}>{page}</Link> */}
                <Button
                  type="button"
                  style={{
                    fontWeight: selected ? "bold" : undefined,
                  }}
                  {...item}
                >
                  {page}
                </Button>
              </>
            );
          } else {
            children = (
              <Button type="button" {...item}>
                {type}
              </Button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
