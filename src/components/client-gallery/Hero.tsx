export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative h-screen flex justify-center align-middle">
      {/* // TODO - The image should be a dynamic background image. */}
      <img
        src="https://images.unsplash.com/photo-1705505460524-8ceac5adcd70?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8NDI4MzU5N3x8ZW58MHx8fHx8&auto=format&fit=crop&w=2830&q=80&blend=666666&exp=5&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="m-auto  max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-2xl font-bold  tracking-widest text-white sm:text-5xl uppercase">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#gallery"
              className="px-6 py-3 ml-8 text-white border-2 border-white text-sm font-semibold uppercase rounded-full hover:cursor-pointer hover:bg-neutral-50/10s transition-all duration-240"
            >
              VIEW GALLERY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
