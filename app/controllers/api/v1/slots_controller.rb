class Api::V1::SlotsController < ApplicationController
  def create
    slot = Slot.new(slot_params)
    if slot.save
      render json: slot, status: :created
    else
      render json: slot.errors, status: :unprocessable_entity
    end
  end

  def for_coach
    slots = Slot.where(coach_id: params[:id]).order(:start_time)
    render json: slots, each_serializer: SlotSerializer
  end

  def available
    slots = Slot.available.order(:start_time)
    render json: slots, each_serializer: SlotSerializer
  end

  private

  def slot_params
    params.require(:slot).permit(:coach_id, :start_time, :end_time)
  end
end
