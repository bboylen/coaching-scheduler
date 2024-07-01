class SlotSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time
  belongs_to :coach
end
