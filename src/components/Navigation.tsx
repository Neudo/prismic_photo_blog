// ./src/components/Navigation.tsx

import { Client, Content, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";

export const Navigation = async ({
                                     client,
                                 }: {
    client: Client<Content.AllDocumentTypes>;
}): Promise<JSX.Element> => {
    const navigation = await client.getSingle("settings");

    return (
        <nav className="font-bold text-xl self-center bg-black p-6">
            <ul className="flex gap-3">
                {isFilled.group(navigation.data.navigation) &&
                    navigation.data.navigation.map((item) => {
                        return (
                            <li key={item.label}>
                                <PrismicLink field={item.link}>{item.label}</PrismicLink>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};
