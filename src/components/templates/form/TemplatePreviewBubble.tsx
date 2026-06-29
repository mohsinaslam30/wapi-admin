/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDraggableScroll } from "@/src/hooks/useDraggableScroll";
import { TemplatePreviewBubbleProps } from "@/src/types/template";
import { BookOpen, Copy, FileText, Gift, GitBranch, Image as ImageIcon, Link, MapPin, Phone, ShieldCheck, ShoppingBag, Smartphone, Video, StickyNote } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { getUrlWithBasePath } from "@/src/utils";
import { TwitterIcon } from "@/src/utils/customIcon";

export const TemplatePreviewBubble = ({
  templateType,
  headerText,
  bodyText,
  footerText,
  buttons,
  fileUrl,
  marketingType = "none",
  offerText,
  productCards = [],
  mediaCards = [],
  authData,
  platform = "whatsapp"
}: TemplatePreviewBubbleProps) => {
  const { t } = useTranslation();
  const productScroll = useDraggableScroll();
  const mediaScroll = useDraggableScroll();

  const isLimitedTimeOffer = marketingType === "limited_time_offer";
  const isCarouselProduct = marketingType === "carousel_product";
  const isCarouselMedia = marketingType === "carousel_media";
  const isCatalog = marketingType === "catalog";
  const isCallPermission = marketingType === "call_permission";
  const isAuthentication = marketingType === "authentication";
  const isSpecial = marketingType !== "none";

  const getBackgroundStyle = () => {
    switch (platform) {
      case "telegram":
        return { className: "bg-gradient-to-b from-[#e3eef9] to-[#d1e4f6] dark:from-[#162534] dark:to-[#0f1721]", style: {} };
      case "facebook":
        return { className: "bg-gradient-to-br from-[#f3f4f6] via-[#eff6ff] to-[#f5f3ff] dark:from-[#18191a] dark:via-[#111827] dark:to-[#1e1b4b]", style: {} };
      case "instagram":
        return { className: "bg-gradient-to-tr from-[#ffe4e6] via-[#e0e7ff] to-[#fef3c7] dark:from-[#2e1020] dark:via-[#0f172a] dark:to-[#1e1e38]", style: {} };
      case "twitter":
        return { className: "bg-gradient-to-b from-[#f3f4f6] to-[#e5e7eb] dark:from-[#15202B] dark:to-[#10171E]", style: {} };
      case "whatsapp":
      default:
        return {
          className: "bg-cover bg-center bg-no-repeat dark:bg-[#0b141a]",
          style: { backgroundImage: `url(${getUrlWithBasePath("/assets/images/1.png")})` }
        };
    }
  };

  const getBubbleStyle = () => {
    switch (platform) {
      case "telegram":
        return "bg-white/95 dark:bg-[#182533]/95 backdrop-blur-xs text-slate-800 dark:text-slate-100 rounded-lg shadow-xs border-0";
      case "facebook":
        return "bg-[#e4e6eb]/90 dark:bg-[#2f3031]/90 backdrop-blur-xs text-black dark:text-white rounded-lg shadow-none border-0";
      case "instagram":
        return "bg-white/85 dark:bg-[#262626]/85 backdrop-blur-xs text-black dark:text-white rounded-lg shadow-xs border border-white/40 dark:border-white/5";
      case "twitter":
        return "bg-white/95 dark:bg-[#192734]/95 backdrop-blur-xs text-slate-800 dark:text-slate-100 rounded-lg shadow-xs border border-gray-200/50 dark:border-gray-800/50";
      case "whatsapp":
      default:
        return "bg-white dark:bg-[#1f2c34] text-slate-800 dark:text-slate-100 rounded-lg rounded-tl-none shadow-xs border border-slate-200/50 dark:border-slate-700/50";
    }
  };

  const getBubblePadding = () => {
    switch (platform) {
      case "instagram":
      case "facebook":
      case "twitter":
        return "px-4 py-2.5";
      case "telegram":
        return "px-3 py-2";
      case "whatsapp":
      default:
        return "p-3";
    }
  };

  const getDividerStyle = () => {
    switch (platform) {
      case "instagram":
      case "telegram":
        return "border-none";
      case "facebook":
      case "twitter":
        return "border-slate-200/30 dark:border-slate-800/30";
      case "whatsapp":
      default:
        return "border-b border-slate-100 dark:border-slate-700/50";
    }
  };

  const getTodayBadge = () => {
    switch (platform) {
      case "instagram":
      case "twitter":
        return (
          <div className="mx-auto w-fit text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase shrink-0 mb-4 select-none">
            Today 10:57 AM
          </div>
        );
      case "telegram":
        return (
          <div className="mx-auto w-fit px-2.5 py-0.5 bg-black/15 dark:bg-white/10 rounded-full text-[10px] font-medium text-white dark:text-slate-200 shrink-0 mb-3 select-none">
            Today
          </div>
        );
      case "facebook":
        return (
          <div className="mx-auto w-fit text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 mb-3 select-none">
            Today 10:57 AM
          </div>
        );
      case "whatsapp":
      default:
        return (
          <div className="mx-auto w-fit px-2 py-0.5 bg-sky-100/80 dark:bg-sky-950/40 rounded text-[9px] uppercase font-bold text-sky-700 dark:text-sky-300 shadow-xs border border-sky-200/50 dark:border-sky-800/50 shrink-0 mb-2 select-none">
            Today
          </div>
        );
    }
  };

  const carouselIndentClass = (platform === "instagram" || platform === "facebook" || platform === "telegram" || platform === "twitter") ? "pl-9" : "";

  const renderChatBubbleGroup = () => {
    const bubbleContent = (
      <>
        {isLimitedTimeOffer && (
          <div className={`p-3 border-b ${getDividerStyle()} ${platform === "instagram" ? "bg-transparent" : "bg-white dark:bg-slate-800"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Gift size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{offerText || t("templates_library_marketing_type_limited_time_offer")}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 break-all whitespace-normal line-clamp-2">{t("templates_library_preview_offer_ends_soon")}</p>
                {buttons?.find((b: any) => b.type === "copy_code")?.text && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium uppercase tracking-wider">
                    {t("templates_library_preview_code_label", { code: buttons.find((b: any) => b.type === "copy_code").text })}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {isCatalog && (
          <div className={`border-b ${getDividerStyle()} ${platform === "instagram" ? "bg-transparent" : ""}`}>
            <div className="flex items-center gap-2.5 p-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                <ShoppingBag size={22} className="text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold text-slate-800 dark:text-slate-200 leading-tight truncate">{t("templates_library_preview_catalog_title")}</p>
                <p className="text-[12px] font-bold text-slate-800 dark:text-slate-200 leading-tight truncate">{t("templates_library_preview_catalog_subtitle")}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug line-clamp-2 break-all whitespace-normal">{t("templates_library_preview_catalog_desc")}</p>
              </div>
            </div>
          </div>
        )}

        {isAuthentication && (
          <div className={`p-3 flex items-center gap-2.5 border-b ${getDividerStyle()} ${platform === "instagram" ? "bg-transparent" : "bg-green-50 dark:bg-green-950/20"}`}>
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
              <ShieldCheck size={15} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-slate-800 dark:text-slate-200 leading-tight">{t("templates_library_preview_otp_title")}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t("templates_library_preview_otp_subtitle")}</p>
            </div>
          </div>
        )}

        {isCallPermission && (
          <div className={`p-3 flex items-center gap-2.5 border-b ${getDividerStyle()} ${platform === "instagram" ? "bg-transparent" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center shrink-0">
              <Phone size={15} className="text-sky-500 dark:text-sky-400" />
            </div>
            <p className="text-[12px] font-bold text-slate-800 dark:text-slate-200 break-all whitespace-normal line-clamp-1">{t("templates_library_preview_call_permission_title")}</p>
          </div>
        )}

        {!isSpecial && (fileUrl || templateType === "location") && templateType !== "text" && templateType !== "none" && (
          <div className="aspect-video bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-600 overflow-hidden relative">
            {fileUrl ? (
              <Image src={fileUrl} alt="Media" className="w-full h-full object-cover" width={100} height={100} unoptimized />
            ) : (
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <MapPin size={40} className="text-slate-200 dark:text-slate-800" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                {templateType === "image" && <ImageIcon size={20} />}
                {templateType === "video" && <Video size={20} />}
                {templateType === "document" && <FileText size={20} />}
                {templateType === "location" && <MapPin size={20} />}
                {templateType === "sticker" && <StickyNote size={20} />}
              </div>
            </div>
          </div>
        )}

        {!isSpecial && headerText && <div className={`p-3 font-bold text-sm text-slate-900 dark:text-slate-100 border-b ${getDividerStyle()} break-all whitespace-normal`}>{headerText}</div>}

        <div className={getBubblePadding()}>
          <div className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word text-slate-800 dark:text-slate-100 break-all whitespace-normal">{bodyText}</div>
          {isAuthentication && authData?.add_security_recommendation && <div className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1">{t("templates_library_preview_security_recommendation")}</div>}
          {isAuthentication && authData?.code_expiration_minutes && <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">⏱ {t("templates_library_auth_expiry_hint_preview", { minutes: authData.code_expiration_minutes, defaultValue: `Code expires in ${authData.code_expiration_minutes} minutes.` })}</div>}
          {!isSpecial && footerText && <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium break-all whitespace-normal mt-1">{footerText}</div>}
          {isAuthentication && footerText && <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium break-all mt-1">{footerText}</div>}

          {platform !== "instagram" && platform !== "facebook" && platform !== "twitter" && (
            <div className="text-[10px] text-slate-400 dark:text-slate-500 text-right mt-1 select-none">{t("templates_library_preview_static_time")}</div>
          )}
        </div>

        {platform !== "telegram" && platform !== "instagram" && platform !== "twitter" && !isCarouselProduct && !isCarouselMedia && !isCatalog && !isCallPermission && !isAuthentication && buttons && buttons.length > 0 && (
          <div className={`border-t divide-y bg-white/50 dark:bg-black/10 ${platform === "facebook" ? "border-slate-200/50 divide-slate-200/50 dark:border-slate-700/50 dark:divide-slate-700/50" : "border-slate-200 dark:border-slate-800 divide-slate-100 dark:divide-slate-800"}`}>
            {buttons.map((btn, idx) => (
              <div key={btn.id || idx} className={`w-full py-2.5 px-4 text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer  transition-colors ${platform === "facebook" ? "text-[#1877F2] dark:text-[#385898] hover:bg-slate-50/50 dark:hover:bg-slate-900/30" : "text-sky-500 hover:bg-slate-50/50 dark:hover:bg-slate-900/30"}`}>
                {btn.type === "phone_call" && <Smartphone size={13} />}
                {(btn.type === "url" || btn.type === "website" || btn.type === "website_url") && <Link size={13} />}
                {btn.type === "copy_code" && <Copy size={13} />}
                {btn.type === "catalog" && <BookOpen size={13} />}
                {btn.type === "flow" && <GitBranch size={13} />}
                {btn.type === "copy_code" ? t("templates_library_auth_button_text_label").split(" ")[0] : btn.text || t("templates_library_button_text_placeholder").split(" ")[1]}
              </div>
            ))}
          </div>
        )}

        {isAuthentication && (
          <div className="border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-black/10">
            <div className="w-full py-2.5 px-4 text-[12px] font-bold text-sky-500 dark:text-sky-400 flex items-center justify-center gap-1.5 cursor-pointer">
              <Copy size={12} />
              {authData?.otp_buttons?.[0]?.copy_button_text || "Copy Code"}
            </div>
          </div>
        )}

        {isCatalog && (
          <div className="border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-black/10">
            <div className="w-full py-2.5 px-4 text-[12px] font-bold text-sky-500 dark:text-sky-400 flex items-center justify-center gap-1.5 cursor-pointer">
              <BookOpen size={12} />
              {buttons?.find((b: any) => b.type === "catalog")?.text || "View catalog"}
            </div>
          </div>
        )}

        {isCallPermission && (
          <div className="border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-black/10">
            <div className="w-full py-2.5 px-4 text-[12px] font-bold text-sky-500 dark:text-sky-400 flex items-center justify-center gap-1.5 cursor-pointer">
              {t("templates_library_preview_choose_preference", { defaultValue: "Choose preference" })}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </>
    );

    if (platform === "instagram" || platform === "facebook" || platform === "telegram" || platform === "twitter") {
      let avatarBg = "bg-gradient-to-tr from-[#fec564] via-[#fd5c63] to-[#d9317a]";
      let iconColor = "text-white";
      if (platform === "facebook") {
        avatarBg = "bg-[#1877F2]";
      } else if (platform === "telegram") {
        avatarBg = "bg-[#5682a3]";
      } else if (platform === "twitter") {
        avatarBg = "bg-black dark:bg-white";
        iconColor = "text-white dark:text-black";
      }

      return (
        <div className="flex flex-col w-full max-w-full select-none shrink-0 mb-1">
          <div className="flex items-end gap-2 w-full">
            <div className={`w-7 h-7 min-w-[28px] min-h-[28px] flex-none rounded-full ${avatarBg} flex items-center justify-center overflow-hidden shadow-xs mb-0.5 select-none`}>
              <ImageIcon size={12} className={iconColor} />
            </div>
            <div className={`overflow-hidden w-fit min-w-0 max-w-[calc(100%-36px)] ${getBubbleStyle()}`}>
              {bubbleContent}
            </div>
          </div>

          {/* Render buttons aligned with the bubble (indented to the right of the avatar) */}
          {platform === "telegram" && !isCarouselProduct && !isCarouselMedia && !isCatalog && !isCallPermission && !isAuthentication && buttons && buttons.length > 0 && (
            <div className="mt-2 pl-9 flex flex-col gap-1 w-full select-none shrink-0">
              {buttons.map((btn: any, idx: number) => (
                <div key={btn.id || idx} className="w-full py-2 bg-white dark:bg-[#182533] text-[#229ED9] dark:text-[#229ED9] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-[12px] font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98">
                  {btn.type === "phone_call" && <Smartphone size={12} />}
                  {(btn.type === "url" || btn.type === "website" || btn.type === "website_url") && <Link size={12} />}
                  <span>{btn.text || "Button"}</span>
                </div>
              ))}
            </div>
          )}

          {platform === "twitter" && !isCarouselProduct && !isCarouselMedia && !isCatalog && !isCallPermission && !isAuthentication && buttons && buttons.length > 0 && (
            <div className="mt-2 pl-9 flex flex-col gap-1.5 w-full select-none shrink-0">
              {buttons.map((btn: any, idx: number) => (
                <div key={btn.id || idx} className="w-full py-2 bg-white dark:bg-[#192734] text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98">
                  {btn.type === "phone_call" && <Smartphone size={12} />}
                  {(btn.type === "url" || btn.type === "website" || btn.type === "website_url") && <Link size={12} />}
                  <span>{btn.text || "Button"}</span>
                </div>
              ))}
            </div>
          )}

          {platform === "instagram" && !isCarouselProduct && !isCarouselMedia && !isCatalog && !isCallPermission && !isAuthentication && buttons && buttons.length > 0 && (
            <div className="mt-2.5 pl-9 flex flex-col gap-2 w-full select-none shrink-0">
              {buttons.map((btn: any, idx: number) => (
                <div key={btn.id || idx} className="w-full py-2 bg-white/80 dark:bg-[#262626]/80 backdrop-blur-xs text-[#0095f6] border border-slate-200/50 dark:border-zinc-800/80 text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all active:scale-98">
                  <span>{btn.text || "Button"}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`overflow-hidden min-w-[75%] max-w-[90%] w-fit shrink-0 mb-3 ${getBubbleStyle()}`}>
        {bubbleContent}
      </div>
    );
  };

  const bgStyleData = getBackgroundStyle();

  return (
    <div 
      className={`flex-1 overflow-y-auto overflow-x-hidden sm:p-3 p-2 pt-6 custom-scrollbar ${bgStyleData.className}`}
      style={bgStyleData.style}
    >
      {getTodayBadge()}

      {renderChatBubbleGroup()}

      {isCarouselProduct && productCards.length > 0 && (
        <div {...productScroll} className={`mt-2 flex gap-2 overflow-x-auto custom-scrollbar pb-1 max-w-[95%] cursor-grab active:cursor-grabbing select-none ${carouselIndentClass}`}>
          {productCards.map((card: any, idx: number) => (
            <div key={card.id || idx} className="shrink-0 w-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden pointer-events-none">
              <div className="h-40 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <ShoppingBag size={24} className="text-slate-300 dark:text-slate-700" />
              </div>
              <div className="p-2 space-y-1.5">
                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">Product {idx + 1}</p>
                <div className="w-full py-2 text-[10px] font-bold text-sky-500 dark:text-sky-400 text-center border-t border-slate-100 dark:border-slate-700">{card.button_text || "View"}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCarouselMedia && mediaCards.length > 0 && (
        <div {...mediaScroll} className={`mt-2 flex gap-2 overflow-x-auto custom-scrollbar pb-1 max-w-[95%] cursor-grab active:cursor-grabbing select-none ${carouselIndentClass}`}>
          {mediaCards.map((card: any, idx: number) => {
            const cardUrl = card.file ? URL.createObjectURL(card.file) : card.media_url || null;
            return (
              <div key={card.id || idx} className="shrink-0 w-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden pointer-events-none">
                <div className="h-40 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden relative">
                  {cardUrl ? <Image src={cardUrl} alt="Card" className="w-full h-full object-cover" width={144} height={80} unoptimized /> : <ImageIcon size={20} className="text-slate-300 dark:text-slate-700" />}
                </div>
                <div className="p-2 text-[11px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">{card.body_text || "No body text yet"}</div>
                {(card.buttons || card.buttonValues || []).length > 0 && (
                  <div className="border-t border-slate-100 dark:border-slate-700">
                    {(card.buttons || card.buttonValues || []).map((btn: any, bIdx: number) => (
                      <div key={btn.id || bIdx} className="text-[10px] py-2 font-bold text-sky-500 dark:text-sky-400 text-center flex items-center justify-center gap-1 border-b border-slate-50 dark:border-slate-700/50">
                        {btn.type === "url" || btn.url ? <Link size={9} /> : null}
                        {btn.text || `Button ${bIdx + 1}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
