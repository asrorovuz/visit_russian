const CustomButton = ({ onClick, text, width, py, px, size }: any) => {
  return (
    <button
      className={`${px ? px : "px-6"} ${py ? py : "py-[14px]"} bg-button rounded-xl ${size ? size : "text-[16px]"} font-semibold text-white ${width ? width : "w-full"}`}
      onClick={onClick}
    >
      {text ? text : "send"}
    </button>
  );
};

export default CustomButton;
