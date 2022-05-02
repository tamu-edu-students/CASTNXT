class Negotiation
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  has_one :client
  field :intermediateSlides, type: Array
  field :finalSlides, type: Array
end
