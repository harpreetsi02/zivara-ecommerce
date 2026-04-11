const SpringEdit = () => {
  return (
    <section className="px-4 py-10 bg-white">

      <div className="relative rounded-xl overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
          alt="spring"
          className="w-full h-[350px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Text Content */}
        <div className="absolute top-6 left-6 text-white">

          <h2 className="text-2xl font-light italic">
            Early
          </h2>

          <h1 className="text-3xl font-bold tracking-wide">
            SPRING EDITS
          </h1>

        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-6 left-6 bg-white text-black px-4 py-2 rounded-md">

          <p className="text-sm">Starting at just</p>
          <h3 className="text-lg font-bold">₹599</h3>

        </div>

      </div>

    </section>
  );
};

export default SpringEdit;