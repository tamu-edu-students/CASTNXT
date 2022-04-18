Rails.application.routes.draw do

  resources :forms
  resources :slides
  resources :submissions
  resources :events
  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index'
  match '/user/event/:id', :controller => 'events', :action => 'show', :via => :get
  
  get '/admin', to: 'admin#index'
  match '/admin/event/new', :controller => 'events', :action => 'new', :via => :get
  
  get '/client', to: 'client#index'
end
