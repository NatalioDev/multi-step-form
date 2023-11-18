import ThankyouIcon from "../../public/assets/images/icon-thank-you.svg";

export default function Thankyou() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5 text-center mt-5">
        <div>
            <img src={ThankyouIcon} alt="Thank you Icon" />
        </div>
        <div className="font-bold text-[#02295a] text-3xl">
            Thank you
        </div>
        <p className=" w-full px-4 md:px-0 text-[#9699ab] text-[14px]">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support. Please feel free to email us at
        your-email@gmail.com
        </p>
    </div>
  )
}
