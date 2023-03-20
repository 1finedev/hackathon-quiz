import Image from "next/image";
import doneLogo from "../../public/done.svg";

function Card({ image, text, type, onClick, classes, selected }) {
  return (
    <div className={classes} onClick={onClick}>
      <span className="flex gap-4 justify-between items-center">
        <span className="flex gap-4">
          <Image src={image} width={30} height={30} alt="" />
          <h3 className="text-lg">{type}</h3>
        </span>
        {selected && <Image src={doneLogo} alt="" width={30} height={30} />}
      </span>
      <p className="text-sm text-secondary-darkGray">{text}</p>
    </div>
  );
}

export default Card;
