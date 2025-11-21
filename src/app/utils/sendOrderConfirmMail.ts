import config from "../config";
import nodemailer from "nodemailer";
import { IOrderItem } from "../modules/Order/Order.interface";

const sendOrderConfirmMail = async (email: string, orderData: any) => {

    //transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports //587,
        auth: {
            user: config.smtp_username,
            pass: config.smtp_password,
        },
    });


    const mailOptions = {
        from: `Online Corner Store ${config.smtp_from}`, //sender email address//smtp-username
        to: email, //receiver email address
        subject: `Order Confirmed - ${orderData.token}`,
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">         
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Order Confirmed! ✓</h1>
                            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 14px;">Thank you for your purchase</p>
                        </td>
                    </tr>

                    <!-- Order Status -->
                    <tr>
                        <td style="padding: 30px 30px 20px 30px; border-bottom: 1px solid #f0f0f0;">
                            <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 600;">Hi ${orderData?.fullName},</p>
                            <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">Your order has been received and is being prepared for shipment. You can track your order status below.</p>
                        </td>
                    </tr>

                    <!-- Order Details Box -->
                    <tr>
                        <td style="padding: 20px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 15px;">
                                <tr>
                                    <td style="padding: 5px 0;">
                                        <p style="margin: 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Order Number</p>
                                        <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 600;">${orderData.token}</p>
                                    </td>
                                    <td style="padding: 5px 0; text-align: right;">
                                        <p style="margin: 0; color: #666666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Order Date</p>
                                        <p style="margin: 5px 0 0 0; color: #333333; font-size: 16px; font-weight: 600;">${(orderData?.createdAt as Date).toDateString()}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Products Table -->
                    <tr>
                       <td style="padding: 0 30px 20px 30px;">
                         <table
                           width="100%"
                           cellpadding="0"
                           cellspacing="0"
                           style="border-collapse: collapse; background-color: #ffffff;"
                    >
                      <thead>
                       <tr
                         style="background-color: #f7f7f7;border-bottom: 2px solid #e5e7eb;"
        >
          <th
            style="
              text-align: left;
              color: #6b7280;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              padding: 14px 10px;
            "
          >
            Product
          </th>

          <th
            style="
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              padding: 14px 10px;
              width: 60px;
            "
          >
            Qty
          </th>

          <th
            style="
              text-align: right;
              color: #6b7280;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              padding: 14px 10px;
              width: 90px;
            "
          >
            Price
          </th>
        </tr>
      </thead>

      <tbody>
        ${orderData?.products
                ?.map(
                    (product: IOrderItem) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <!-- Product Name -->
          <td
            style="
              padding: 14px 10px;
              color: #111827;
              font-size: 14px;
              font-weight: 600;
              max-width: 260px;
              word-break: break-word;
              line-height: 1.4;
            "
          >
            ${product.name}
          </td>

          <!-- Quantity -->
          <td
            style="
              padding: 14px 10px;
              text-align: center;
              color: #374151;
              font-size: 14px;
              font-weight: 500;
            "
          >
            ${product.quantity}
          </td>

          <!-- Price -->
          <td
            style="
              padding: 14px 10px;
              text-align: right;
              color: #1f2937;
              font-size: 14px;
              font-weight: 600;
            "
          >
            $${product.price}
          </td>
        </tr>
        `
                )
                .join("")}
      </tbody>
    </table>
  </td>
</tr>



                    <!-- Pricing Summary -->
                    <tr>
                        <td style="padding: 20px 30px; border-top: 2px solid #f0f0f0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr style="border-bottom: 1px solid #e0e0e0;">
                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Subtotal</td>
                                    <td style="padding: 8px 0; text-align: right; color: #666666; font-size: 14px;">$${orderData?.subTotal?.toFixed(2)}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e0e0e0;">
                                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Shipping</td>
                                    <td style="padding: 8px 0; text-align: right; color: #666666; font-size: 14px;">$${orderData?.shippingCost?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: #333333; font-size: 16px; font-weight: 600;">Total</td>
                                    <td style="padding: 12px 0; text-align: right; color: #667eea; font-size: 18px; font-weight: 700;">$${orderData?.total?.toFixed(2)}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Shipping Address -->
                    <tr>
                     <td style="padding: 30px; background-color: #ffffff;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="
                         background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
                        border-left: 5px solid #667eea;
                        border-radius: 10px;
                       padding: 20px;
                       ">
                       <tr>
                         <td style="padding-bottom: 10px;">
                          <p style="
                           margin: 0;
                          color: #333333;
                          font-size: 16px;
                         font-weight: 600;
                         letter-spacing: 0.5px;
                       ">
                        📦 Shipping Address
                       </p>
                     </td>
                    </tr>

            <tr>
                <td style="
                    color: #555555;
                    font-size: 14px;
                    line-height: 1.8;
                    padding-top: 5px;
                ">
                    <strong style="color:#333;">${orderData.fullName}</strong><br>
                    📞 ${orderData.phone}<br>
                    ${orderData?.shipping?.streetAddress}<br>
                    ${orderData?.shipping?.city},
                    ${orderData?.shipping?.state},
                    ${orderData?.shipping?.zipCode}
                </td>
            </tr>
        </table>
    </td>
</tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `
    };

    return await transporter.sendMail(mailOptions);
};

export default sendOrderConfirmMail;