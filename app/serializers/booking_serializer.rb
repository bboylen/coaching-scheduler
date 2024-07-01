class BookingSerializer < ActiveModel::Serializer
  attributes :id, :notes, :satisfaction_rating, :completed
  belongs_to :slot, serializer: SlotSerializer
  belongs_to :student
end
