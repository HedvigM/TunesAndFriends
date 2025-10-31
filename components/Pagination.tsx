import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { Button } from "styles/Button";

export default function UsePagination() {
  const { items } = usePagination({
    count: 10,
  });

  /* TODO: kolla så denna verkligen funkar.  */
  return (
    <nav>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex" }}>
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
      </ul>
    </nav>
  );
}
