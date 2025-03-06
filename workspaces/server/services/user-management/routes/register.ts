import { Router } from "express";
import multer from "multer";
import { register } from "../controllers/register";

// Multer ayarları: Fotoğraf yükleme
const storage = multer.memoryStorage(); // Fotoğrafı bellekte saklamak için
const upload = multer({ storage: storage }).single("photo"); // Tek bir dosya yüklemek için

const router = Router();

/**
 * @swagger
 * /api/user-management/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User management]
 *     description:  Register a new user with body params and upload a profile photo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username to create
 *                 example: ""
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: ""
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: ""
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The profile photo of the user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User created successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     sub:
 *                       type: string
 *                       example: "uuid"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "Serhat Dalgalıdere"
 *                     photo_url:
 *                       type: string
 *                       example: "https://example.com/avatars/uuid.png"
 *                     email_verified:
 *                       type: boolean
 *                       example: true
 *                     phone_verified:
 *                       type: boolean
 *                       example: true
 *                 access_token:
 *                       type: string
 *                       example: "jwt_token"
 */
router.post("/user-management/register", upload, register);

export default router;
