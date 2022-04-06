Rails.application.routes.draw do

  root 'home#index'
  
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index', as: 'user'
  get '/admin', to: 'admin#index', as: 'admin'
  get '/client', to: 'client#index', as: 'client'
end
