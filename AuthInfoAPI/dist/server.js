"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// 2. mongooseスキーマの定義
const userSchema = new mongoose_1.Schema({
    _id: {
        type: String, // MongoDBの_idは通常string型
        required: true
    },
    user_id: Number,
    user_name: String,
    role: String,
    category_id: Number,
    extension_number: Number,
    mail_address: String,
    model_id: Number,
    organization: String
});
//3. Mongooseモデルの作成
const UserModel = mongoose_1.default.model('User', userSchema, 'users');
//4. Expressアプリケーションのセットアップ
const app = (0, express_1.default)();
const port = 3000;
// CORSミドルウェアの使用
app.use((0, cors_1.default)());
// リクエストボディをJSONとしてパースするためのミドルウェア (POSTリクエストなどで使用)
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 5. MongoDBへの接続
const mongoURI = 'mongodb://localhost:27017/cmfmatch';
mongoose_1.default.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection Error:', err));
// 6.APIエンドポイント
app.get('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching users from MongoDB', error: error.message });
        }
        else {
            res.status(500).json({ massage: 'An unknown error occurred while fetching users' });
        }
    }
}));
// (オプション) 特定のユーザーを取得するエンドポイント例
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.findById(req.params.id);
        if (!user) {
            // 404エラーを返し、処理を終了
            return res.status(404).json({ message: 'User not found' });
        }
        // 成功レスポンスを返し、処理を終了
        return res.status(200).json(user); // ★ ここにも return を追加
    }
    catch (error) {
        if (error instanceof Error) {
            // 500エラーを返し、処理を終了
            return res.status(500).json({ message: 'Error fetching user', error: error.message }); // ★ ここにも return を追加
        }
        else {
            // その他の500エラーを返し、処理を終了
            return res.status(500).json({ message: 'An unknown error occurred' }); // ★ ここにも return を追加
        }
    }
}));
// 7. サーバーの起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
