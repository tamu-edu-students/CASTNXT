class Producer
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  field :is_valid, type: Boolean
  
  has_many :events
  has_many :forms
end
