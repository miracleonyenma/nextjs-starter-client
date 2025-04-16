import StarterIcon from "@/components/Icon/Starter";

const SiteLogo = () => {
  return (
    <figure className="flex items-center gap-1 text-blue-600">
      <StarterIcon className="icon text-payred-06 h-12 w-12" />
      <figcaption className="text-2xl font-extrabold">Starter</figcaption>
    </figure>
  );
};
export default SiteLogo;
