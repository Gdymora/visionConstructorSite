import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LinkWithIcon = ({ href, icon, text }) => {
  return (
    <>
      <div className="border-b border-white"></div>
      <a
        href={href}
        className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
      >
        {icon && <FontAwesomeIcon className="mr-4" icon={icon} />}
        {text}
      </a>
    </>
  );
};

export default LinkWithIcon;
