import Image from "next/image";
import Link from "next/link";
import { userI } from "../utils/types/users/userTypes";

const UsersCard = ({ user_id, given_name, family_name, picture }: userI) => {
  return (
    <Link className="users-card" href={`conversations/${user_id}`}>
      <div className="photos">
        {<Image src={picture} alt="" width={100} height={100} />}
      </div>
      <span className="seperator"></span>
      <div className="name">{`${given_name} ${family_name}`}</div>
      <div className="status">
        <p>Online</p>
        <div className="circle"></div>
      </div>
    </Link>
  );
};

export default UsersCard;
