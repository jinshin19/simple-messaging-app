// "use client";
import Image from "next/image";
import googleIcon from "../../public/google-iconv2.png";
import Link from "next/link";

const Signin = () => {
  return (
    <div className="signin-wrapper">
      <Link href={"http://localhost:3001/api/auth/google"}>
        <Image src={googleIcon} width={30} height={30} alt="Google Icon" /> Sign
        in with Google
      </Link>
    </div>
  );
};

export default Signin;
