import Hotel from "../infrastructure/entities/hotel.js";
const hotels = [
  {
    _id: "1",
    name: "Montmartre Majesty Hotel",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
    location: "Paris, France",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 160,
  },
  {
    _id: "2",
    name: "Loire Luxury Lodge",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596257607.jpg?k=0b513d8fca0734c02a83d558cbad7f792ef3ac900fd42c7d783f31ab94b4062c&o=&hp=1",
    location: "Sydney, Australia",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 200,
  },
  {
    _id: "3",
    name: "Tokyo Tower Inn",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308797093.jpg?k=3a35a30f15d40ced28afacf4b6ae81ea597a43c90c274194a08738f6e760b596&o=&hp=1",
    location: "Tokyo, Japan",
    rating: 4.4,
    reviews: ["K", "L"],
    price: 250,
  },
  {
    _id: "4",
    name: "Sydney Harbor Hotel",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/84555265.jpg?k=ce7c3c699dc591b8fbac1a329b5f57247cfa4d13f809c718069f948a4df78b54&o=&hp=1",
    location: "Sydney, Australia",
    rating: 4.8,
    reviews: ["K", "L"],
    price: 300,
  },
];

// Controller function to get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).send();
  }
};

// Controller function to create a new hotel
export const createHotel = async (req, res) => {
  try {
    const HotelData = req.body;
    if (
      !HotelData.name ||
      !HotelData.image ||
      !HotelData.location ||
      !HotelData.price ||
      !HotelData.description
    ) {
      return res.status(400).send();
    }
    await Hotel.create(HotelData);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
};

// Controller function to get a specific hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const _id = req.params._id;
    const hotelData = await Hotel.findById(_id);
    if (!hotelData) {
      res.status(404).send();
      return;
    }
    res.status(200).json(hotelData);
  } catch {
    res.status(500).send();
  }
};

// Controller function to update a hotel completely
export const updateHotel = async (req, res) => {
  try {
    const _id = req.params._id;
    const hotelData = req.body;
    if (
      !hotelData.name ||
      !hotelData.image ||
      !hotelData.location ||
      !hotelData.price ||
      !hotelData.description
    ) {
      return res.status(400).send();
    }
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      res.status(404).send();
      return;
    }

    await Hotel.findByIdAndUpdate(_id, hotelData);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
};

// Controller function to partially update a hotel (patch)
export const patchHotel = (req, res) => {
  const _id = req.params._id;
  const hotel = hotels.find((el) => el._id === _id);
  if (!hotel) {
    res.status(404).send();
  }

  const data = req.body;
  hotel.price = data.price;
  res.status(200).send();
};

// Controller function to delete a hotel
export const deleteHotel = (req, res) => {
  const _id = req.params._id;
  const index = hotels.findIndex((el) => el._id === _id);
  if (index === -1) {
    res.status(404).send();
  }
  hotels.splice(index, 1);
  res.status(200).send();
};
