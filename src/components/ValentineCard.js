import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '../hooks/useWindowSize';

const messages = [
  { 
    text: "Your smile is the quiet rebellion against life's chaos that I want to fight for forever",  
    side: "left"  
  },  
  {  
    text: "With you, time bends—seconds stretch into lifetimes, and years collapse into a single breath",  
    side: "right"  
  },  
  {  
    text: "You've memorized the parts of me I've spent decades trying to bury. What is love if not being seen?",  
    side: "left"  
  },  
  {  
    text: "I don't believe in soulmates. But I believe in choices, and I choose you—again, and again, and again",  
    side: "right"  
  },  
  {  
    text: "Your hands hold galaxies I've yet to name—entire worlds in the space between our fingers",  
    side: "left"  
  },  
  {  
    text: "We're not two halves. We're two wildfires learning to burn in the same sky without consuming each other",  
    side: "right"  
  },  
  {  
    text: "You taste like tomorrow—all the unwritten mornings I want to wake up tangled in",  
    side: "left"  
  },  
  {  
    text: "I don't need forever. Just give me this: the way your laughter rewrites my darkest hours",  
    side: "right"  
  },  
  {  
    text: "You're the echo I've been chasing—the song my bones hummed before they knew your name",  
    side: "left"  
  },  
  {  
    text: "Let's get lost in the in-between—that sacred space where 'you' and 'I' dissolve into something older than language",  
    side: "right"  
  }
]

const FloatingMessage = ({ message, visible, side, showMessages }) => (
  showMessages && (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : (side === 'left' ? -100 : 100) }}
    transition={{ duration: 0.5 }}
    className={`fixed ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-[#995A5A] font-just-another-hand text-3xl max-w-[200px] text-center`}
    style={{ pointerEvents: 'none' }}
  >
    {message}
  </motion.div>)
);

const ImageModal = ({ image, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <motion.img
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        src={image}
        alt="Expanded view"
        className="max-w-full max-h-[90vh] rounded-lg cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const calculateTimeLeft = (startDate) => {
  const difference = new Date().getTime() - new Date(startDate).getTime();
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: Math.abs(days),
    hours: Math.abs(hours),
    minutes: Math.abs(minutes),
    seconds: Math.abs(seconds)
  };
};

const ValentineCard = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [showThirdCard, setShowThirdCard] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const correctCode = '623';
  const [code, setCode] = useState(['', '', '']);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft('2023-06-23'));
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSecondCard, setShowSecondCard] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e) => {
    const element = e.target;
    const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollPosition(scrollPercent);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft('2023-06-23'));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleNumberClick = (number) => {
    const emptyIndex = code.findIndex((val) => val === '');
    if (emptyIndex !== -1) {
      const newCode = [...code];
      newCode[emptyIndex] = number;
      setCode(newCode);

      // Only check if this was the last number entered
      if (emptyIndex === 2) {
        const enteredCode = newCode.join('');
        if (enteredCode === correctCode) {
          setTimeout(() => {
            setShowSecondCard(true);
          }, 500);
          setIsCorrect(true);
        } else {
          setTimeout(() => {
            setCode(['', '', '']);
          }, 500);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFD5C0] p-4 flex items-center justify-center w-full">
      <AnimatePresence>
        <div className="fixed inset-0 pointer-events-none hidden md:block">
          {messages.map((msg, index) => {
            const scrollThreshold = (index / messages.length) * 100;
            const nextThreshold = ((index + 1) / messages.length) * 100;
            
            return (
              <FloatingMessage
                key={index}
                message={msg.text}
                visible={
                  scrollPosition >= scrollThreshold &&
                  scrollPosition < nextThreshold
                  && showThirdCard
                }
                side={msg.side}
                showMessages={showThirdCard}
              />
            );
          })}
        </div>

        {/* First Card */}
        <motion.div className="bg-[#FFE9CB] p-4 sm:p-6 rounded-xl shadow-lg max-w-2xl w-full mx-auto"
          animate={isCorrect ? { x: '100vw' } : {}}
          transition={{ duration: 0.5 }}
          key="first-card"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Frame Section */}
            <div className="flex-1 md:w-1/2">
              <div className="border-4 border-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image17.jpg')}
                  alt="Valentine"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Input and Keypad Section */}
            <div className="flex-1 md:w-1/2 flex flex-col items-center justify-center">
              <p className="text-xl font-just-another-hand mb-4 ml-15 text-[#995A5A]">
                Enter the code
              </p>
              {/* Display entered code */}
              <div className="flex gap-2 mb-4">
                {code.map((digit, index) => (
                  <div key={index} className="w-12 h-12 border-2 border-[#995A5A] rounded-lg flex items-center justify-center text-[#995A5A] text-xl">
                    {digit}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 justify-center w-full max-w-[300px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    className="w-full aspect-square bg-[#EEAA9B] rounded-lg text-[#995A5A] text-xl font-bold hover:opacity-90 transition-colors font-just-another-hand"
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second Card */}
        {showSecondCard && (
          <motion.div
            className="fixed inset-0 m-auto h-fit bg-[#FFE9CB] p-3 sm:p-6 rounded-xl shadow-lg max-w-2xl w-full"
            initial={{ x: '-100vw' }}
            animate={showThirdCard ? { x: '-100vw' } : { x: 0 }}
            transition={{ duration: 0.5 }}
            key="second-card"
          > 
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-just-another-hand text-[#995A5A]">
                Days we've been together
              </h2>
            </div>

            {/* Timer Display */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="text-center">
                <span className="text-3xl sm:text-5xl font-bold text-[#995A5A]">{timeLeft.days}</span>
                <p className="text-sm text-[#995A5A]">Days</p>
              </div>
              <span className="text-3xl text-[#995A5A]">•</span>
              <div className="text-center">
                <span className="text-3xl sm:text-5xl font-bold text-[#995A5A]">{timeLeft.hours}</span>
                <p className="text-sm text-[#995A5A]">Hrs</p>
              </div>
              <span className="text-3xl text-[#995A5A]">•</span>
              <div className="text-center">
                <span className="text-3xl sm:text-5xl font-bold text-[#995A5A]">{timeLeft.minutes}</span>
                <p className="text-sm text-[#995A5A]">Mins</p>
              </div>
              <span className="text-3xl text-[#995A5A]">•</span>
              <div className="text-center">
                <span className="text-3xl sm:text-5xl font-bold text-[#995A5A]">{timeLeft.seconds}</span>
                <p className="text-sm text-[#995A5A]">Secs</p>
              </div>
            </div>

            {/* Footer */}
            <button 
              onClick={() => setShowThirdCard(true)}
              className="w-full bg-[#FFD5C0] py-2 rounded-lg text-center hover:opacity-90 transition-opacity"
            >
              <span className="text-white text-lg font-just-another-hand">H & J</span>
            </button>
          </motion.div>
        )}

        {/* Third Card */}
        {showThirdCard && (
          <motion.div
            className="fixed inset-0 m-auto h-fit bg-[#FFE9CB] p-3 sm:p-6 rounded-xl shadow-lg max-w-2xl w-full overflow-hidden"
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            key="third-card"
          >
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-[#995A5A] text-3xl font-just-another-hand">Our Story</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto p-2 custom-scrollbar" onScroll={handleScroll}>
              {/* Row 1-7 remain the same */}
              <div className="h-32 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image1.jpg')} 
                  alt="Us 1" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image1.jpg'))}
                />
              </div>
              <div className="h-32 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image2.jpg')} 
                  alt="Us 2" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105" 
                  onClick={() => setSelectedImage(require('./images/image2.jpg'))}
                />
              </div>
              <div className="h-32 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image3.jpg')} 
                  alt="Us 3" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image3.jpg'))}
                />
              </div>
              
              <div className="h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image4.jpg')} 
                  alt="Us 4" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image4.jpg'))}
                />
              </div>
              <div className="col-span-2 h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image5.jpg')} 
                  alt="Us 5" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image5.jpg'))}
                />
              </div>
              
              <div className="col-span-2 h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image6.jpg')} 
                  alt="Us 6" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image6.jpg'))}
                />
              </div>
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image7.jpg')} 
                  alt="Us 7" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image7.jpg'))}
                />
              </div>
              
              <div className="h-36 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image8.jpg')} 
                  alt="Us 8" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image8.jpg'))}
                />
              </div>
              <div className="h-36 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image9.jpg')}
                  alt="Us 9" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image9.jpg'))}
                />
              </div>
              <div className="h-36 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image10.jpg')} 
                  alt="Us 10" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image10.jpg'))}
                />
              </div>
              
              <div className="col-span-2 h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image11.jpg')} 
                  alt="Us 11" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image11.jpg'))}
                />
              </div>
              <div className="h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image12.jpg')} 
                  alt="Us 12" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image12.jpg'))}
                />
              </div>
              
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image13.jpg')} 
                  alt="Us 13" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image13.jpg'))}
                />
              </div>
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image14.jpg')} 
                  alt="Us 14" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image14.jpg'))}
                />
              </div>
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image15.jpg')} 
                  alt="Us 15" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image15.jpg'))}
                />
              </div>

              <div className="col-span-3 h-52 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image16.jpg')} 
                  alt="Us 16" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image16.jpg'))}
                />
              </div>

              <div className="col-span-3 h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image17.jpg')} 
                  alt="Us 17" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image17.jpg'))}
                />
              </div>

              {/* Row 9 */}
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 19.jpg')} 
                  alt="Us 19" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 19.jpg'))}
                />
              </div>
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 20.jpg')} 
                  alt="Us 20" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 20.jpg'))}
                />
              </div>
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 21.jpg')} 
                  alt="Us 21" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 21.jpg'))}
                />
              </div>

              {/* Row 10 */}
              <div className="col-span-2 h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 22.jpg')} 
                  alt="Us 22" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 22.jpg'))}
                />
              </div>
              <div className="h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 23.jpg')} 
                  alt="Us 23" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 23.jpg'))}
                />
              </div>

              {/* Row 11 */}
              <div className="h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 24.jpg')} 
                  alt="Us 24" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 24.jpg'))}
                />
              </div>
              <div className="col-span-2 h-40 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image 25.jpg')} 
                  alt="Us 25" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image 25.jpg'))}
                />
              </div>

              {/* Row 12 */}
              <div className="col-span-3 h-52 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image26.jpg')} 
                  alt="Us 26" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image26.jpg'))}
                />
              </div>

              {/* Row 13 */}
              <div className="h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image27.jpg')} 
                  alt="Us 27" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image27.jpg'))}
                />
              </div>
              <div className="h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image28.jpg')} 
                  alt="Us 28" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image28.jpg'))}
                />
              </div>
              <div className="h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image29.jpg')} 
                  alt="Us 29" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image29.jpg'))}
                />
              </div>

              {/* Row 14 */}
              <div className="col-span-2 h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image30.jpg')} 
                  alt="Us 30" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image30.jpg'))}
                />
              </div>
              <div className="h-48 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image31.jpg')} 
                  alt="Us 31" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image31.jpg'))}
                />
              </div>

              {/* Row 15 */}
              <div className="h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image32.jpg')} 
                  alt="Us 32" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image32.jpg'))}
                />
              </div>
              <div className="col-span-2 h-44 bg-white rounded-lg overflow-hidden">
                <img 
                  src={require('./images/image33.jpg')} 
                  alt="Us 33" 
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(require('./images/image33.jpg'))}
                />
              </div>
            </div>

            {/* Footer */}
            <button 
              className="w-full bg-[#FFD5C0] py-2 rounded-lg text-center hover:opacity-90 transition-opacity"
              onClick={() => {}}
            >
              <span className="text-white text-lg font-just-another-hand">H & J</span>
            </button>
          </motion.div>
        )}
        
        <AnimatePresence>
          {selectedImage && (
            <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
};

export default ValentineCard;
