import Image from "next/image";
import qr from "../images/qr.png";

export default function FooterItems() {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <div className="flex  items-center justify-center w-full h-5/6 ">
        <div className="flex items-center justify-center w-1/2 h-full text-base font-normal flex-col p-2">
          <h2 className="text-xl font-bold flex items-center justify-start w-full h-1/3">Shop</h2>
          <div className="text-sm flex items-start justify-start h-1/3 w-1/2 self-start">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </div>
          <div className="flex items-center justify-start w-full h-1/3">
            <Image src={qr} alt="qr" width={60} height={60} />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/2 h-full py-4 px-[10%] text-base font-normal">
          <div className="flex items-center justify-center w-1/3 h-full flex-col">
            <h3 className="text-lg font-bold flex items-center justify-center">About</h3>
            <div className="flex items-center justify-start w-full h-full flex-col text-slate-300">
              <div>Shop pay</div>
              <div>Help centar</div>
              <div>For brands</div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/3 h-full flex-col">
            <h3 className="text-lg font-bold">Spcial</h3>
            <div className="flex items-center justify-start w-full h-full flex-col text-slate-300">
              <div>X</div>
              <div>Instagram</div>
            </div>
          </div>
          <div className="flex items-center justify-center w-1/3 h-full flex-col">
            <h3 className="text-lg font-bold">Legal</h3>
            <div className="flex items-center justify-start w-full h-full flex-col text-slate-300">
              <div>Terms of Service</div>
              <div>Privacy Policy</div>
              <div>Legal Notices</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full h-1/6  text-xs font-light p-1 border-t-2 border-slate-600">
        <div className="flex items-center justify-center">Powered by me</div>
        <div className="flex items-center justify-center">@ Me Inc. 2024</div>
      </div>
    </div>
  );
}
