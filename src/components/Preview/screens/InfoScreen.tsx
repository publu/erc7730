import { useContext } from "react";
import { Device } from "../DeviceInteractive";
import { DeviceContext } from "../DeviceContext";
import flexBackArrow from "../screens/assets/flex-back-arrow.svg";
import staxBackArrow from "../screens/assets/stax-back-arrow.svg";
import { cn } from "../../../lib/utils";

export const InfoScreen = ({
  address,
  info: { legalName, url } = {
    legalName: "{metadata.info.legalName}",
    url: "{metadata.info.url}",
  },
  onBack,
}: {
  address: string;
  info: { legalName: string; url: string };
  onBack?: () => void;
}) => {
  const isStax = useContext(DeviceContext) === "stax";

  return (
    <>
      <div className="relative border-b border-light-grey">
        <div
          className={cn(
            "absolute bottom-0 left-0 top-0 flex cursor-pointer items-center justify-center",
            isStax ? "w-[44px]" : "w-[52px]"
          )}
          onClick={onBack}
        >
          {isStax ? (
            <img className="inline-block w-4" src={staxBackArrow} alt="Back" />
          ) : (
            <img className="inline-block w-5" src={flexBackArrow} alt="Back" />
          )}
        </div>
        <div
          className={cn(
            "py-[6px] text-center",
            isStax ? "px-[44px]" : "px-[52px]"
          )}
        >
          <Device.ActionText>Smart contract information</Device.ActionText>
        </div>
      </div>
      <div className="grow">
        <Device.Section>
          <Device.ActionText>Contract owner</Device.ActionText>
          <Device.ContentText>
            {legalName}
            <br />
            {url}
          </Device.ContentText>
        </Device.Section>
        <Device.Section>
          <Device.ActionText>Contract address</Device.ActionText>
          <Device.ContentText>{address}</Device.ContentText>
        </Device.Section>
      </div>
      <div></div>
    </>
  );
};
