import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schema/users';
import { Model } from 'mongoose';

export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findOne(query: any) {
    return await this.userModel.findOne(query);
  }

  async find(query: any) {
    return await this.userModel.find(query);
  }

  async findAll() {
    return await this.userModel.find().select('-password');
  }

  async create(data: Record<string, any>) {
    return await this.userModel.create(data);
  }

  async createAndSave(data: Record<string, any>) {
    const model = new this.userModel(data);
    await model.hashPassword();
    return await model.save();
  }

  async updateOne(query: any, data: Record<string, any>) {
    return await this.userModel.updateOne(query, data);
  }

  async findById(id: string) {
    return await this.userModel.findById(id).select('-password');
  }

  async findOneAndUpdate(id: string, updateData: Record<string, any>) {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateData);
  }

  get model() {
    return this.userModel;
  }
}
