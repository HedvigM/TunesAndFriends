import Link from "next/link";
import { Button } from "styles/Button";
import styles from "styles/Typography.module.scss";

interface TableProps {
  onClickHandle: (id: number) => void;
  know: boolean;
  pathname: string;
  slug: string | number;
  data: TableData;
}

export type TableData = {
  name: string;
  id: number;
};
export const StyledTable = ({
  data,
  onClickHandle,
  know,
  pathname,
  slug,
}: TableProps) => {

/* TODO: Hamnar inte i mitten när man gör fönstret mindre. */
  return (
    <div style={{ margin: "0", maxWidth: "600px", minWidth: "300px", width: "100%" }}>
      <div
        style={{
          borderTop: "1px solid grey",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "80% 1fr",
          ":lastChild td, :lastChild th": { border: 0 },
        } as React.CSSProperties}
      >
        <Link
          href={{
            pathname: `${pathname}`,
            query: { slug: `${slug}` },
          }}
        >
          <p className={styles.tableLink}>{data.name}</p>
        </Link>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px 0",
          }}
        >
          {/* Remove button, add tag? */}
          <Button element="button" active={know} onClick={() => onClickHandle(data.id)}>
            add
          </Button>
        </div>
      </div>
    </div>
  );
};
