import Address from "../../models/Address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Provide All Data",
      });
    }
    const newAdress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAdress.save();
    res.status(201).json({
      success: true,
      data: newAdress,
    });
  } catch (error) {
    console.error("error in addAdress Controller", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const allAddress = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: allAddress,
    });
  } catch (error) {
    console.error("error in addAdress Controller", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and adressId is required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    if(!address){
        return res.status(404).json({
            success : false,
            message : "Address not found"
        })
    }

    res.status(200).json({
        sucess : true,
        data : address
    })

  } catch (error) {
    console.error("error in addAdress Controller", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and adressId is required",
      });
    }

    const deletedAdress = await Address.findOneAndDelete({
        _id : addressId , userId
    });

    if(!deletedAdress){
        return res.status(404).json({
            success : false,
            message : "Address not found"
        })
    };

    res.status(200).json({
        success : true,
        message : "Address deleted sucessfully"
    })





  } catch (error) {
    console.error("error in addAdress Controller", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
