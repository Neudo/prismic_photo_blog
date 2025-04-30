import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";

export function useMenu() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const settingsData = await client.getSingle("settings");
      setSettings(settingsData);
    };
    fetchSettings();
  }, []);

  return settings;
}