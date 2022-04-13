class Form
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :producer
  belongs_to :event
  
  field :data, type: String
end