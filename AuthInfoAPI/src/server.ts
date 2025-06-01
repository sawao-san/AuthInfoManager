import express, { Request, Response, Application } from 'express';
import mongoose, {Document, Schema, Model } from 'mongoose';
import cors from 'cors';
import { error } from 'console';


// 1. Userインターフェースの定義
interface IUser extends Document {
    _id: string; // MongoDBの_idは通常string型
    user_id: number;
    user_name: string;
    role: string;
    category_id: number;
    extension_number: number;
    mail_address: string; 
    model_id: number;
    organization: string;
}

// 2. mongooseスキーマの定義
const userSchema: Schema<IUser> = new Schema({
    _id: {
        type:String, // MongoDBの_idは通常string型
        required:true
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
const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');


//4. Expressアプリケーションのセットアップ
const app: Application = express();
const port: number = 3000;

// CORSミドルウェアの使用
app.use(cors());

// リクエストボディをJSONとしてパースするためのミドルウェア (POSTリクエストなどで使用)
app.use(express.json());
app.use(express.urlencoded({extended: true}));  


// 5. MongoDBへの接続
const mongoURI = 'mongodb://localhost:27017/cmfmatch';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch( err => console.error('MongoDB connection Error:', err));


// 6.APIエンドポイント
app.get('/Users', async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await UserModel.find();
        res.status(200).json(users);
    }catch(error){
        console.error('Error fetching users:', error);
        if(error instanceof Error){
            res.status(500).json({message: 'Error fetching users from MongoDB', error: error.message});    
        }else{
            res.status(500).json({massage: 'An unknown error occurred while fetching users'});
        }
    }
});

// (オプション) 特定のユーザーを取得するエンドポイント例
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await UserModel.findById(req.params.id);
    if (!user) {
      // 404エラーを返し、処理を終了
      return res.status(404).json({ message: 'User not found' });
    }
    // 成功レスポンスを返し、処理を終了
    return res.status(200).json(user); // ★ ここにも return を追加
  } catch (error) {
    if (error instanceof Error) {
      // 500エラーを返し、処理を終了
      return res.status(500).json({ message: 'Error fetching user', error: error.message }); // ★ ここにも return を追加
    } else {
      // その他の500エラーを返し、処理を終了
      return res.status(500).json({ message: 'An unknown error occurred' }); // ★ ここにも return を追加
    }
  }
});


// 7. サーバーの起動
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});