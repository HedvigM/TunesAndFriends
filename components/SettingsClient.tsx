"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AccountInfo } from "components/accountInfo";
import { ProfileImage } from "components/ProfileImage";
import { ComponentErrorBoundary } from "components/errors/ComponentErrorBoundary";
import { Button } from "styles/Button";
import Link from "next/link";
import { updateUserProfileAction } from "app/settings/actions";

type UserData = {
  id: number;
  email: string;
  town: string | null;
  profileText: string | null;
};

type ProfileClientProps = {
  databaseUser: UserData;
  userPicture: string | null;
};

export function ProfileClient({ databaseUser, userPicture }: ProfileClientProps) {
  const [town, setTown] = useState(databaseUser.town || "");
  const [profileText, setProfileText] = useState(databaseUser.profileText || "");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleProfileChange = async (profileText: string, town: string) => {
    if (!databaseUser || !databaseUser.id || !databaseUser.email) {
      setError("User data is missing");
      return;
    }

    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await updateUserProfileAction(
        databaseUser.email,
        town,
        profileText
      );

      if (result.success) {
        setSuccess(true);
        // Refresh the page to show updated data
        setTimeout(() => {
          setSuccess(false);
          router.refresh();
        }, 2000);
      } else {
        setError(result.error || "Failed to update profile");
      }
    });
  };

  const setNewProfileText = (value: string) => {
    setProfileText(value);
  };

  const setNewTownText = (value: string) => {
    setTown(value);
  };

  return (
    <>
      <ComponentErrorBoundary componentName="Profile Image">
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileImage size={"large"} picture={userPicture} />
        </div>
      </ComponentErrorBoundary>
      <ComponentErrorBoundary componentName="Account Information">
        <AccountInfo
          handleProfileChange={handleProfileChange}
          newProfileText={setNewProfileText}
          newTownText={setNewTownText}
          databaseUser={databaseUser}
        />
        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "green",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Your changes have been saved!
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            element="button"
            active={true}
            onClick={() => handleProfileChange(profileText, town)}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </ComponentErrorBoundary>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px 0",
        }}
      >
        <Link href="/api/auth/logout" style={{ textDecoration: "none" }}>
          <Button element="button" active={false}>
            Log out
          </Button>
        </Link>
      </div>
    </>
  );
}

