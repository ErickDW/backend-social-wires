import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async findAll() {
		return await this.userModel
			.find()
			.exec()
			.then((us: User[]) => {
				const uts = new Array<any>();
				us.forEach((item) => {
					const { password, ...rta } = item.toJSON();
					uts.push(rta);
				});
				return uts;
			});
	}

	async findOne(id: string): Promise<any> {
		const { password, ...rta } = (await this.userModel.findById(id)).toJSON();
		if (!rta) {
			return 'Not found user';
		}
		return rta;
	}

	async getMessagesToDaysByUser(userId: string) {
		const user = await this.findOne(userId);
		return {
			date: new Date(),
			user,
			messages: [],
		};
	}

	async create(data: CreateUserDto): Promise<any> {
		const newModel = new this.userModel(data);
		const hashPassword = await bcrypt.hash(newModel.password, 10);
		newModel.password = hashPassword;
		const model = await newModel.save();
		const { password, ...rta } = model.toJSON();
		return rta;
	}

	findByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async update(id: string, changes: UpdateUserDto): Promise<any> {
		if (changes.password) {
			const hashPassword = await bcrypt.hash(changes.password, 10);
			changes.password = hashPassword;
		}
		return this.userModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec()
			.then((us) => {
				const { password, ...rta } = us.toJSON();
				if (!rta) {
					return 'Not found user';
				}
				return { ...rta, passwordChage: true };
			});
	}

	remove(id: string) {
		const userDelete = this.userModel.findByIdAndDelete(id);
		if (!userDelete) {
			return 'Not found user';
		}
		return userDelete;
	}
}
