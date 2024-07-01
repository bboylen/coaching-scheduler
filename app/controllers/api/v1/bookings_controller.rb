class Api::V1::BookingsController < ApplicationController
  def create
    booking = Booking.new(booking_params)
    if booking.save
      render json: booking, status: :created
    else
      render json: booking.errors, status: :unprocessable_entity
    end
  end

  def update
    booking = Booking.find(params[:id])
    if booking&.update(booking_params)
      render json: booking
    else
      render json: booking.errors, status: :unprocessable_entity
    end
  end

  def for_coach
    coach = Coach.find(params[:id])
    bookings = coach.bookings
    render json: bookings, each_serializer: BookingSerializer
  end

  def for_student
    bookings = Booking.where(student_id: params[:id])
    render json: bookings, each_serializer: BookingSerializer
  end

  private

  def booking_params
    params.require(:booking).permit(:id, :slot_id, :student_id, :satisfaction_rating, :notes, :completed)
  end
end
