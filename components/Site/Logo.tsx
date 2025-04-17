import StarterIcon from "@/components/Icon/Starter";

const SiteLogo = () => {
  return (
    <figure className="flex items-center gap-1 text-blue-600">
      <StarterIcon className="icon text-payred-06 h-6 w-6" />
      <figcaption className="text-xl font-extrabold">Starter</figcaption>
    </figure>
  );
};
export default SiteLogo;
