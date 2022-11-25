import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ReturnNotFoundException } from '../../../nmd_core/common/utils/custom.error';
import { ButtonRepo } from '../../repo';
import { CreateButtonReq, UpdateButtonStatusReq } from '../../request';

@Injectable()
export class ButtonService {
  constructor(private readonly buttonRepo: ButtonRepo) {}

  async getById(id: ObjectId) {
    const oldButton = await this.buttonRepo.getById(id);
    if (!oldButton) throw ReturnNotFoundException('Button not found.');
    return oldButton;
  }

  async getByOwnerId(ownerId: string) {
    const buttons = await this.buttonRepo.getAllButtonsByOwnerId(ownerId);
    if (!buttons) throw ReturnNotFoundException('Buttons not found');

    return buttons;
  }

  async createButton(createButtonReq: CreateButtonReq) {
    const newButton = await this.buttonRepo.create(createButtonReq);
    return newButton;
  }
  async updateButton(updateButtonStatusReq: UpdateButtonStatusReq) {
    const oldBtn = await this.getById(updateButtonStatusReq.id);

    return oldBtn;
  }

  async updateButtonStatus(updateButtonReq: UpdateButtonStatusReq) {
    const oldBtn = await this.getById(updateButtonReq.id);

    const updatedData = {
      status: updateButtonReq.status,
    };

    const newBtn = await this.buttonRepo.upsert(
      updateButtonReq.id,
      updatedData,
    );
    return newBtn;
  }
}
