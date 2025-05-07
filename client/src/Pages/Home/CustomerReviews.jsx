import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample review data
const reviewsData = [
    {
        id: 1,
        stars: 5,
        highlight: "It's beautiful! 😍",
        text: "Beautiful suit, fine quality, fabric is so soft...",
        reviewer: "Sarah Johnson",
        image: "/api/placeholder/50/50"
    },
    {
        id: 2,
        stars: 5,
        highlight: "Absolutely perfect! 💯",
        text: "The fit is excellent and the material is top-notch. Highly recommend!",
        reviewer: "Michael Chen",
        image: "/api/placeholder/50/50"
    },
    {
        id: 3,
        stars: 4,
        highlight: "Great value! 👌",
        text: "Really impressed with the quality for the price. Minor sizing issue.",
        reviewer: "Priya Patel",
        image: "/api/placeholder/50/50"
    },
    {
        id: 4,
        stars: 5,
        highlight: "Stunning piece! ✨",
        text: "I've received so many compliments. The details are exquisite.",
        reviewer: "David Wilson",
        image: "/api/placeholder/50/50"
    },
    {
        id: 5,
        stars: 3,
        highlight: "Exceeded expectations! 🌟",
        text: "The craftsmanship is remarkable. Worth every penny.",
        reviewer: "Emma Thompson",
        image: "/api/placeholder/50/50"
    },
    {
        id: 6,
        stars: 4,
        highlight: "Very satisfied! 😊",
        text: "Great design and comfort. Shipping was quick and packaging was elegant.",
        reviewer: "James Rodriguez",
        image: "/api/placeholder/50/50"
    },
    {
        id: 7,
        stars: 5,
        highlight: "Luxury at its best! 👑",
        text: "The fabric feels amazing against the skin. Absolute perfection.",
        reviewer: "Sophia Lee",
        image: "/api/placeholder/50/50"
    },
    {
        id: 8,
        stars: 3,
        highlight: "A dream come true! 💭",
        text: "I've been looking for something like this for ages. So happy with my purchase.",
        reviewer: "Raj Malhotra",
        image: "/api/placeholder/50/50"
    },
    {
        id: 9,
        stars: 4,
        highlight: "Elegant and refined! 🌹",
        text: "The attention to detail is remarkable. Minor issue with delivery.",
        reviewer: "Olivia Garcia",
        image: "/api/placeholder/50/50"
    },
    {
        id: 10,
        stars: 5,
        highlight: "Pure magic! ✨",
        text: "The quality and design are outstanding. Can't wait to order more.",
        reviewer: "Ahmed Hassan",
        image: "/api/placeholder/50/50"
    }
];

// Sort reviews by stars (descending) and then by id (ascending) if stars are equal
const sortedReviewsData = [...reviewsData].sort((a, b) => {
    // First sort by stars (highest first)
    if (b.stars !== a.stars) {
        return b.stars - a.stars;
    }
    // If stars are equal, sort by id (lowest first)
    return a.id - b.id;
});

// Individual review card component
const ReviewCard = ({ review }) => {
    return (
        <div className="bg-cream rounded-lg border-maroon-20 shadow-custom p-6 mx-2 flex flex-col items-center h-full">
            <div className="flex mb-2">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={20}
                        fill={index < review.stars ? "#FFD700" : "none"}
                        stroke={index < review.stars ? "#FFD700" : "#FFD700"}
                        className="mx-0.5"
                    />
                ))}
            </div>
            <h3 className="text-xl font-medium text-darkBrown mt-2 mb-1 text-center">{review.highlight}</h3>
            <p className="text-darkBrown text-center mb-6">{review.text}</p>
            <div className="mt-auto flex flex-col items-center">
                <img
                    src={review.image}
                    alt={review.reviewer}
                    className="w-10 h-10 rounded-full mb-2 object-cover"
                />
                <p className="font-medium text-darkBrown">{review.reviewer}</p>
            </div>
        </div>
    );
};

// Main carousel component
export default function CustomerReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const carouselRef = useRef(null);

    const itemsPerSlide = {
        sm: 1,  // Mobile
        md: 2,  // Tablet
        lg: 3,  // Laptop/Desktop
    };

    // Get current window width for responsive display
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine number of items per slide based on screen size
    const getItemsToShow = () => {
        if (windowWidth < 640) return itemsPerSlide.sm;
        if (windowWidth < 1024) return itemsPerSlide.md;
        return itemsPerSlide.lg;
    };

    const itemsToShow = getItemsToShow();
    const totalSlides = Math.ceil(sortedReviewsData.length / itemsToShow);

    // Navigation functions
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 100) {
            // Swipe left, go to next slide
            goToNextSlide();
        } else if (touchEndX - touchStartX > 100) {
            // Swipe right, go to prev slide
            goToPrevSlide();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // Auto-advance the carousel - slowed down to 10 seconds (from 5 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 10000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    // Calculate which reviews to show in the current slide
    const startIndex = currentIndex * itemsToShow;
    const visibleReviews = sortedReviewsData.slice(startIndex, startIndex + itemsToShow);

    return (
        <div className="bg-cream py-12 px-4 md:px-6 lg:px-12">
            <h2
                className="text-center text-darkBrown text-3xl md:text-4xl font-semibold mb-8"
                data-aos="fade-up"
            >
                From Our Customers, With Love
            </h2>

            <p className="text-center text-darkBrown mb-10">
                {sortedReviewsData.length} reviews from satisfied customers
            </p>

            <div className="relative max-w-6xl mx-auto">
                {/* Carousel navigation buttons */}
                <button
                    onClick={goToPrevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-cream rounded-full p-2 shadow-custom z-10 text-maroon hover:text-darkMaroon transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Carousel container */}
                <div
                    ref={carouselRef}
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-1000 ease-out"
                        style={{
                            transform: `translateX(-${(100 / totalSlides) * currentIndex}%)`,
                            width: `${totalSlides * 100}%`
                        }}
                    >

                        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                            const slideStartIndex = slideIndex * itemsToShow;
                            const slideReviews = sortedReviewsData.slice(slideStartIndex, slideStartIndex + itemsToShow);

                            return (
                                <div
                                    key={slideIndex}
                                    className="flex"
                                    style={{ width: `${100 / totalSlides}%` }}
                                >
                                    {slideReviews.map(review => (
                                        <div
                                            key={review.id}
                                            className="w-full px-2 md:px-3"
                                        >
                                            <ReviewCard review={review} />
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={goToNextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-cream rounded-full p-2 shadow-custom z-10 text-maroon hover:text-darkMaroon transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${currentIndex === index
                                ? 'bg-maroon w-6'
                                : 'bg-maroon bg-opacity-30 hover:bg-opacity-50'
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
