"use client";
import { TuneObject } from "types/tune";
import { addTagToTuneAction } from "app/myTunes/actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TuneListWithTagsProps = {
    tune: TuneObject;
    sortTag: string;
}

export const TuneListWithTags = (props: TuneListWithTagsProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    /* TODO: Käns fel att ha en så här stor funktion här. Buisnis logic borde vara någon annan stans. Och Den ser även "test" och "test2" som samma tag. Borde kunna ha taggar med siffror i.  */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        const formData = new FormData(event.target as HTMLFormElement);
        const tagName = formData.get("tag") as string;
        const tuneId = parseInt(formData.get("tuneId") as string, 10);

        if (!tagName || tagName.trim().length === 0) {
            setError("Tag name cannot be empty");
            return;
        }

        if (!tuneId || isNaN(tuneId)) {
            setError("Invalid tune ID");
            return;
        }

        startTransition(async () => {
            const result = await addTagToTuneAction(tuneId, tagName);

            if (result.success) {
                setSuccess(true);
                // Reset form
                (event.target as HTMLFormElement).reset();
                // Clear success message after 2 seconds
                setTimeout(() => {
                    setSuccess(false);
                    // Refresh the page data to show the new tag
                    router.refresh();
                }, 2000);
            } else {
                setError(result.error || "Failed to add tag");
            }
        });
    }

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
                <Link href={`/tune/${props.tune.id}`} style={{ margin: "0", padding: "0" }}>{props.tune.name}</Link>

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
            <form style={{ display: "flex", gap: "5px", flexDirection: "column" }} onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: "5px" }}>
                    <input 
                        type="text" 
                        name="tag" 
                        placeholder="Add tag..."
                        disabled={isPending}
                        style={{ 
                            padding: "5px", 
                            border: "1px solid #ccc", 
                            borderRadius: "3px",
                            flex: 1
                        }}
                    />
                    <input type="hidden" name="tuneId" value={props.tune.id} />
                    <button 
                        type="submit"
                        disabled={isPending}
                        style={{
                            padding: "5px 10px",
                            backgroundColor: isPending ? "#ccc" : "var(--color-primary)",
                            border: "1px solid var(--color-primary)",
                            borderRadius: "3px",
                            cursor: isPending ? "not-allowed" : "pointer",
                        }}
                    >
                        {isPending ? "Saving..." : "Save tag"}
                    </button>
                </div>
                {error && (
                    <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0" }}>
                        {error}
                    </p>
                )}
                {success && (
                    <p style={{ color: "green", fontSize: "12px", margin: "5px 0 0 0" }}>
                        Tag added successfully!
                    </p>
                )}
            </form>
            </div>
    )
}

export default TuneListWithTags;