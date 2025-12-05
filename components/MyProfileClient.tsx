"use client";
import Link from "next/link";
import { Button } from "styles/Button";

type UserData = {
  email: string;
  name: string;
  town: string | null;
  profileText: string | null;
};

type MyProfileClientProps = {
  databaseUser: UserData;
};

export function MyProfileClient({ databaseUser }: MyProfileClientProps) {

  return (
    <div>
        <h1>My Profile</h1>
        <p>Email: {databaseUser.email}</p>
        <p>Name: {databaseUser.name}</p>
        <p>Town: {databaseUser.town}</p>
        <p>Profile Text: {databaseUser.profileText}</p>
        <Link href="/my-profile/settings" style={{ textDecoration: "none" }}>
          <Button element="button" active={false}>
            Edit profile
          </Button>
        </Link>
    </div>
  );
}

