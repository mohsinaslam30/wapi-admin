"use client";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { AppSettings } from "@/src/redux/api/settingApi";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import SettingCard from "../shared/SettingCard";
import { Check, Facebook, Instagram, Send, Twitter } from "lucide-react";
import { TwitterIcon } from "@/src/utils/customIcon";

const CHANNELS = [
  {
    id: "telegram",
    name: "Telegram Bot",
    description: "Enable Telegram integration to allow customer support, broadcast messages, and automated chatbots.",
    icon: Send,
    colorClass: "border-sky-200/60 dark:border-sky-900/30 hover:border-sky-500/50 dark:hover:border-sky-500/40 hover:shadow-sky-500/8 bg-gradient-to-br from-sky-50/40 via-white to-sky-50/20 dark:from-sky-900/20 dark:via-(--card-color) dark:to-sky-900/10",
    activeColorClass: "border-sky-500 ring-2 ring-sky-500/20 bg-sky-500/5 dark:bg-sky-500/10",
    iconColorClass: "bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
    activeIconColorClass: "bg-sky-500 text-white dark:bg-sky-500 dark:text-white"
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    description: "Enable Facebook integration to interact directly with clients via pages, comments, and automated workflows.",
    icon: Facebook,
    colorClass: "border-blue-200/60 dark:border-blue-900/30 hover:border-blue-600/50 dark:hover:border-blue-600/40 hover:shadow-blue-600/8 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/20 dark:from-blue-900/20 dark:via-(--card-color) dark:to-blue-900/10",
    activeColorClass: "border-blue-600 ring-2 ring-blue-600/20 bg-blue-600/5 dark:bg-blue-600/10",
    iconColorClass: "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    activeIconColorClass: "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    description: "Enable Instagram integration to receive customer DMs, track media shares, and run promotional customer campaigns.",
    icon: Instagram,
    colorClass: "border-pink-200/60 dark:border-pink-900/30 hover:border-pink-500/50 dark:hover:border-pink-500/40 hover:shadow-pink-500/8 bg-gradient-to-br from-pink-50/40 via-white to-pink-50/20 dark:from-pink-900/20 dark:via-(--card-color) dark:to-pink-900/10",
    activeColorClass: "border-pink-500 ring-2 ring-pink-500/20 bg-pink-500/5 dark:bg-pink-500/10",
    iconColorClass: "bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
    activeIconColorClass: "bg-pink-500 text-white dark:bg-pink-500 dark:text-white"
  },
  // {
  //   id: "twitter",
  //   name: "Twitter / X",
  //   description: "Enable Twitter / X integration to interact with users via DMs, campaigns, and automated replies.",
  //   icon: TwitterIcon,
  //   colorClass: "border-gray-200/60 dark:border-gray-800/30 hover:border-black/50 dark:hover:border-white/40 hover:shadow-black/8 bg-gradient-to-br from-gray-50/40 via-white to-gray-50/20 dark:from-gray-800/20 dark:via-(--card-color) dark:to-gray-800/10",
  //   activeColorClass: "border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20 bg-gray-50/5 dark:bg-gray-900/10",
  //   iconColorClass: "bg-gray-100 text-black dark:bg-gray-950/40 dark:text-white",
  //   activeIconColorClass: "bg-black text-white dark:bg-white dark:text-black"
  // }
];

const ChannelsSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);

  const omnichannelPlatforms = Array.isArray(settings.omnichannel_platforms)
    ? settings.omnichannel_platforms
    : ["facebook", "instagram", "telegram"];

  const onChange = (key: keyof AppSettings, value: AppSettings[keyof AppSettings]) => {
    dispatch(updateSettingField({ key, value }));
  };

  const togglePlatform = (platformId: string) => {
    let updated: string[];
    if (omnichannelPlatforms.includes(platformId)) {
      updated = omnichannelPlatforms.filter((p) => p !== platformId);
    } else {
      updated = [...omnichannelPlatforms, platformId];
    }
    onChange("omnichannel_platforms", updated);
  };

  return (
    <div className="space-y-5">
      <SettingCard
        title="Omnichannel Platforms"
        description="Choose which communication channels are enabled globally across the system. Disabled channels will not be accessible to workspaces, regardless of their subscription plan."
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 pt-2">
          {CHANNELS.map((ch) => {
            const isActive = omnichannelPlatforms.includes(ch.id);
            const IconComponent = ch.icon;

            return (
              <div
                key={ch.id}
                onClick={() => togglePlatform(ch.id)}
                className={`relative flex flex-col justify-between sm:p-6 p-4 rounded-lg border cursor-pointer hover:shadow-lg transition-all duration-300 group ${isActive ? ch.activeColorClass : ch.colorClass
                  }`}
              >
                {/* Active Indicator Check */}
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${isActive
                      ? "bg-emerald-500 border-emerald-500 text-white scale-100"
                      : "border-gray-200 dark:border-slate-800 text-transparent scale-90"
                    }`}
                >
                  <Check size={14} strokeWidth={3} />
                </div>

                <div className="space-y-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? ch.activeIconColorClass : ch.iconColorClass
                      }`}
                  >
                    <IconComponent size={22} />
                  </div>

                  {/* Header & Details */}
                  <div className="space-y-1.5 pr-6">
                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                      {ch.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {ch.description}
                    </p>
                  </div>
                </div>

                {/* Status indicator pill at bottom */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-(--card-border-color) flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Status</span>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border ${isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-gray-100 text-gray-400 dark:bg-(--page-body-bg) dark:text-gray-500 border-gray-200 dark:border-slate-800"
                      }`}
                  >
                    {isActive ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SettingCard>
    </div>
  );
};

export default ChannelsSettings;
