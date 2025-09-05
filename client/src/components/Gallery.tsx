const Gallery = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80"
  ];

  return (
    <section id="gallery" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">PHOTO GALLERY</span>
          <h2 className="text-4xl font-['Poppins'] uppercase tracking-wider">Property Highlights</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-video overflow-hidden rounded-lg fade-in">
              <img 
                src={image} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                alt={`Property Image ${index + 1}`} 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center text-[#D9A566] font-['Poppins'] hover:underline transition-all">
            <span>View Full Gallery</span>
            <i className='bx bx-right-arrow-alt ml-2'></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
