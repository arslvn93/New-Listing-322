const Location = () => {
  return (
    <section id="location" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">LOCATION</span>
          <h2 className="text-4xl font-['Poppins'] uppercase tracking-wider">Neighborhood & Accessibility</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 h-[400px] rounded-lg overflow-hidden fade-in">
            {/* Interactive map placeholder */}
            <div className="w-full h-full bg-primary/50 flex items-center justify-center">
              <div className="text-center p-8">
                <i className='bx bx-map text-6xl text-[#D9A566] mb-4'></i>
                <h3 className="font-['Poppins'] text-xl mb-3">Interactive Map</h3>
                <p className="font-['Titillium_Web'] text-gray-300">123 Hillcrest Avenue, Beverly Hills, CA 90210</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 fade-in">
            <h3 className="text-2xl font-['Poppins'] mb-6">Premier Location</h3>
            <p className="font-['Titillium_Web'] text-lg mb-6">
              Located in the prestigious Hillcrest Estates neighborhood, this property offers the perfect blend of privacy, convenience, and luxury living.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/50 p-5 rounded-lg">
                <h4 className="font-['Poppins'] text-[#D9A566] mb-3">Nearby Amenities</h4>
                <ul className="space-y-2 font-['Titillium_Web']">
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Hillcrest Country Club (0.8 mi)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Gourmet Marketplace (1.2 mi)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Westfield Shopping Center (2.5 mi)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Fine Dining District (3.0 mi)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary/50 p-5 rounded-lg">
                <h4 className="font-['Poppins'] text-[#D9A566] mb-3">Transportation</h4>
                <ul className="space-y-2 font-['Titillium_Web']">
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>LAX Airport (25 min)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Downtown LA (20 min)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Beverly Hills Business District (10 min)</span>
                  </li>
                  <li className="flex items-center">
                    <i className='bx bx-check-circle text-[#D9A566] mr-2'></i>
                    <span>Pacific Coast Highway (15 min)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center bg-[#D9A566] text-white font-['Poppins'] px-6 py-3 rounded-lg hover:bg-[#D9A566]/80 transition-colors"
            >
              <i className='bx bx-directions mr-2'></i>
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
