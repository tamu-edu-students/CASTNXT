 class ClientController < ApplicationController
  def index
    authenticate_user!('client')
    
    @properties = {name: session[:userName]}
  end
end
