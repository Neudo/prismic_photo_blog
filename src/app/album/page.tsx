import React from "react";
import Bounded from "@/components/Bounded";

export default function page() {
  return (
    <Bounded>
      <h1>Album</h1>
      <p>Merci de saisir le mot de passe de l&apos;album</p>
      <form action="">
        <input type="password" name="password" id="password" />
        <button type="submit">Valider</button>
      </form>
    </Bounded>
  );
}
