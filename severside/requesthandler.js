import userSchema from "./model/user.js"
import productSchema from "./model/product.js";
import sellerData from "./model/seller.js";
import addressSchema from "./model/address.js"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"

const { sign } = pkg

const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port:2525 ,
    // secure: false,
    auth: {
    //   user: "usmnchusman606@gmail.com",
    //   pass: "kobm upne reiz mryv",
    user:"usmanchusman606@gmail.com",
    pass:"kobm upne reiz mryv"
  },
})

export async function addUser(req, res) {
  const { username, email, pwd, cpwd } = req.body
  const user = await userSchema.findOne({ email })
  if (!user) {
    if (!(username && email && pwd && cpwd))
      return res.status(500).send({ msg: "fields are empty" })
    if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" })
    bcrypt
      .hash(pwd, 10)
      .then((hpwd) => {
        userSchema.create({ username, email, pass: hpwd })
        res.status(201).send({ msg: "Successfull" })
      })
      .catch((error) => {
        console.log(error)
      });
  } else {
    res.status(500).send({ msg: "email already used " })
  }
}

export async function login(req, res) {
  const { email, pass } = req.body
  if (!(email && pass))
    return res.status(500).send({ msg: "fields are empty" })
  const user = await userSchema.findOne({ email })
  if (!user) return res.status(500).send({ msg: "email donot exist" })
  const success = await bcrypt.compare(pass, user.pass)
  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" })
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {expiresIn: "24h",})
  res.status(201).send({ token })
}

export async function verifyEmail(req, res) {
  const { email } = req.body;
  console.log(email);
  
  if (!(email)) {
      return res.status(500).send({ msg: "fields are empty" });
  }

  try {
      const user = await userSchema.findOne({ email });

      if (user) {
          const info = await transporter.sendMail({
            from: 'usmanchusman606@gmail.com', // sender address
            to: email, // list of receivers
            subject: "email", // Subject line
            text: "VERIFY! your email", // plain text body
            html: `
            <div style="height: 200px; width: 200px; margin-left: 500px; margin-top: 250px;" >
        <div style="width: 400px; height: 150px; border:none; background-color: rgb(248, 247, 247); border-radius: 3px; box-shadow:0 0 2px 2px rgb(199, 197, 197); ">
            <h3 style="color: rgb(146, 57, 16); font-weight: bold; font-size: 25px; margin-top: 10px; margin-left: 110px;">Email Validation</h3>
            <input type="text" name="email" id="email" placeholder="enter email" style="width: 250px; height: 30px; margin-top: 40px; margin-left: 20px;">
             <a href="http://localhost:5173/register">
            <button style="height:40px; width: 90px; color: white; background-color: seagreen; border: none; border-radius: 4px; font-weight: bold;">Verify</button>
            </a>
        </div>
    </div>
    `,
    })
    console.log("Message sent: %s", info.messageId);
            res.status(200).send({ msg: " email sent" });
        } else {
            return res.status(500).send({ msg: "Email doesn't exist" });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ msg: "Error sending email" });
    }
  }

export async function passchange(req, res) {
  const { email, pwd, cpwd } = req.body; 
  if (!email || !pwd || !cpwd) {
      return res.status(400).send({ msg: "Email and both passwords are required" });
  }
  if (pwd !== cpwd) {
      return res.status(400).send({ msg: "Passwords do not match" });
  }

  try {
      const user = await userSchema.findOne({ email });
      if (!user) {
          return res.status(404).send({ msg: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(pwd, 10);
      const result = await userSchema.updateOne(
          { email: email },
          { $set: { pass: hashedPassword } }
      );
      if (result.modifiedCount === 0) {
          return res.status(500).send({ msg: "Password update failed" });
      }
      res.status(200).send({ msg: "Password updated successfully" });
  } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).send({ msg: "Something went wrong" });
  }
}


export async function homepage(req, res) {
  try {
      const products = await productSchema.find();
      if (products.length > 0) {
          res.status(200).send(products);
      } else {
          res.status(404).send({ msg: "No data found" });
      }
  } catch (error) {
      res.status(500).send({ msg: "Error retrieving data" });
  }
}


export async function addproduct(req, res) {
  const { ...data } = req.body;
  try {
      if (Object.keys(data).length === 0) {
          return res.status(400).send({ msg: "Fields are empty" });
      }
      
      data.user_id = req.user.UserID;
      const post = await productSchema.create(data);
      res.status(200).send({ msg: "Product created successfully" });
  } catch (error) {
      res.status(500).send({ msg: "Error creating product" });
  }
}

export async function navdata(req, res) {
  try {
      const user = await userSchema.findOne({ _id: req.user.UserID });
      if (user) {
          return res.status(200).send({ user });
      }
      res.status(404).send({ msg: "User not found" }); 
  } catch (error) {
      res.status(500).send({ msg: "Error retrieving user", error: error.message });
  }
}

export async function sellerdata(req, res) {
  const { ...data } = req.body;
  try {
      const user = await userSchema.findOne({ _id: req.user.UserID });
      if (user && user.acctype === "seller") {
          data.seller_id = req.user.UserID;
          const companyData = await sellerData.create(data);
          if (companyData) {
              return res.status(200).send({ msg: "Company data added successfully" });
          }
          return res.status(500).send({ msg: "Failed to add company data" });
      } else {
          return res.status(403).send({ msg: "You are not a seller" });
      }
  } catch (error) {
      return res.status(500).send({ msg: "Error processing request"});
  }
}
export async function displaycompany(req,res) {
  try {
      const company = await sellerData.findOne({ seller_id: req.user.UserID });
      if (company) {
          return res.status(200).send({ company });
      }
      res.status(404).send({ msg: "Company data not found" });
  } catch (error) {
      res.status(500).send({ msg: "Error retrieving company data" });
  }
}


export async function categories(req, res) {
  try {
      const categories = await productSchema.distinct("category", { user_id: req.user.UserID });
      
      if (categories.length > 0) {
          return res.status(200).send({ categories });
      }
      
      res.status(404).send({ msg: "No categories found" });
  } catch (error) {
      res.status(500).send({ msg: "Error retrieving categories" });
  }
}


export async function buyerdetails(req, res) {
  try {
      const buyer = await userSchema.findOne({ _id: req.user.UserID });
      
      if (buyer && buyer.acctype === "buyer") {
          return res.status(200).send({ buyer });
      } else {
          return res.status(500).send({ msg: "You are not a buyer" });
      }
  } catch (error) {
      return res.status(500).send({ msg: "Error retrieving buyer details" });
  }
}

export async function editbuyer(req, res) {
  const { ...data } = req.body;
  try {
      const update = await userSchema.updateOne(  { _id: req.user.UserID }, { $set: data } );

      if (update.nModified > 0) {
          res.status(200).json({ message: 'Buyer information updated successfully.' });
      } else {
          res.status(400).json({ message: 'No changes were made.' });
      }
  } catch (error) {
      console.error("Error updating buyer information:");
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}



export async function addAddress(req, res) {
const { ...data } = req.body;
try {
  data.user_id=req.user.UserID
  const newAddress = await addressSchema.create(data);
  
  res.status(200).send({ msg: 'Address added successfully' });
} catch (error) {
  res.status(500).send({ msg: 'Error adding address'});
}
}



export async function displayaddress(req, res) {
  try {
      const addresses = await addressSchema.find({ user_id: req.user.UserID });
      if (!addresses.length) {
          return res.status(200).json({ msg: 'No addresses found', addresses: [] });
      }
      return res.status(200).json(addresses);
  } catch (error) {
      console.error("Error fetching addresses:", error);
      return res.status(500).json({ msg: 'Error fetching addresses' });
  }
}




export async function deleteAddress(req, res) {
  const { id } = req.params;
  try {
      const deletedData = await addressSchema.deleteOne({ _id: id });
      if (deletedData.deletedCount === 0) {
          return res.status(404).send({ msg: "Address not found" });
      }
      res.status(200).send({ msg: "Address deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Server error" });
  }
}


// export async function getUser(req, res) {
//   const usr = await userSchema.findOne({ _id: req.user.UserID })
//   res.status(200).send({ name: usr.username })
// }

// export async function getUserData(req, res) {
//   const usr = await userSchema.findOne({ _id: req.user.UserID })
//   const data = await userDataSchema.findOne({ userId: req.user.UserID })
//   if (!data) res.status(200).send({ usr })
//   else {
//     res.status(200).send({ usr, data })
//   }
// }

// export async function addUserData(req, res) {
//     try {
//       const { nickname, dob, note } = req.body
//     await userDataSchema.create({userId:req.user.UserID,nickname,dob,note})
//       res.status(200).send({ msg: "Data added successfully!" })
//     } catch (error) {
//       console.error(error)
//       res.status(500).send({ msg: "Failed to add data. Please try again." })
//     }
// }
  
// export async function editUserData(req, res) {
//     try {
//       const { nickname, dob, note } = req.body
//       const updatedData = await userDataSchema.updateOne({ userId: req.user.UserID },{ $set: { nickname, dob, note } },)
//       res.status(200).send({ msg: "Data updated successfully!", data: updatedData })
//     } catch (error) {
//       console.error(error)
//       res.status(500).send({ msg: "Failed to update data. Please try again." })
//     }
// }  

// export async function deleteUser(req, res) {
//   try {
//     await userDataSchema.deleteOne({userId:req.user.UserID})
//     await userSchema.deleteOne({ _id: req.user.UserID })
//     res.status(200).send({ msg: "Data deleted successfully!"})
//   } catch (error) {
//     console.error(error)
//     res.status(500).send({ msg: "Failed to delete data. Please try again." })
//   }
// } 

// export async function addPost(req, res) {
//   try {
//     // console.log(req.user.UserID)
//     const currentDate = new Date();
//     const date = currentDate.toLocaleDateString();
//     const time = currentDate.toLocaleTimeString(); 

//     const {caption,description,images}=req.body
//     const post = await postSchema.create({userId: req.user.UserID,caption,description,images,date,time});
//     res.status(200).send({ msg: "Post added successfully!", data: post })
//   } catch (error) {
//     console.error(error)
//     res.status(500).send({ msg: "Failed to add data. Please try again." })
//   }
// }

// export async function getPosts(req, res) {
//   try {
//     const posts = await postSchema.find({ userId: req.user.UserID });
//     if (!posts || posts.length === 0) {
//       return res.status(200).send({ msg: "No posts found", data: [] });
//     }
//     res.status(200).send({ data: posts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
//   }
// }

// export async function getAllPosts(req, res) {
//   try {
//     const posts = await postSchema.find();
//     // if (!posts || posts.length === 0) {
//     //   return res.status(200).send({ msg: "No posts found", data: [] });
//     // }
//     res.status(200).send({ data: posts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: "Failed to fetch posts. Please try again." });
//   }
// }

// export async function getPost(req, res) {
//   try {
//     const post = await postSchema.findOne({_id: req.params.id});
//     // if (!post) {
//     //   return res.status(404).send({ msg: "Post not found" });
//     // }
//     res.status(200).send({ post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: "Failed to fetch post. Try again later." });
//   }
// }

// export async function deletePost(req, res) {
//   try {
//     const post = await postSchema.deleteOne({_id: req.params.id});
//     res.status(200).send({ msg: "Post deleted successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ msg: "Failed to delete post. Try again later." });
//   }
// }