![Screenshot at 2022-04-03 16-35-43](https://user-images.githubusercontent.com/56533891/161439106-aa6e0321-cb04-4344-a906-8095146325de.png)

###Event Calendar

##Projeyi docker üzerinde ayağa kaldırma

#Acount Service
1. accountService klasörü içine girerek docker-compose up --build komutu ile accountService yi ayağa kaldır.
2. Docker exec -it accountservice_account_1(container adı) sh komutu ile docker containeri içerisine gir.
3. php artisan migrate komutu ile veritabanını içeri aktar. <br>

bu 3 adımı uyguladıktan sonra accountService miz hazır şimdi calendarServiceyi ayağa kaldıracağız

#Calendar Service
1. calendarService klasörü içine girerek docker-compose up --build komutu ile CalendarService yi ayağa kaldır.
2. docker exec -it calendarservice_calendar_1(container adı) komutu ile docker containeri içerisine gir.
3. php artisan migrate komutu ile veritabanını içeri aktar. <br>

ve accountService mizde hazır şimdi arayüzü ayağı kaldıracağız.

#FrontEnd
1. calendarApp klasörü içine girerek docker-compose up --build komutu ile FrontEnd i ayağa kaldır. <br>

son adımımızıda yaparak projemiz hazır hale geldi.

#Arayüz adresi <br>
http://localhost:3000/ adresi ile projemizi açıyoruz. Karşımıza gelen ekranda kullanıcı kaydımızı yapıyoruz ve bizi takvimimize yönlendiriyor.
yeni bir event oluşturmak için gün sayılarının üstüne tıklayarak eventimizi oluşturuyoruz. Oluşturduğumuz eventi güncellemek ve silmek içinde eventin üstüne tıklayarak güncelleyip siliyoruz.
<br>
#Endpoint <br>
http://localhost:8000/api/register <br>
//Kullanıcı kayıt. name, email, password. METHOD: POST <br>
http://localhost:8000/api/login <br>
//Kullanıcı giriş. email, password. METHOD: POST <br>
http://localhost:8000/api/logout <br>
//Kullanıcı çıkış. Bearer + token(kullanıcı kayıt olduktan sonra oluşturulan token). METHOD: POST <br>
<br>
http://localhost:8001/api/events <br>
//Tüm eventleri görüntüle. METHOD: GET <br>
http://localhost:8001/api/event/{id} <br>
//Seçilen id deki eventi görüntüle. METHOD: GET <br>
http://localhost:8001/api/event <br>
//Yeni event oluştur title, description, date(unixtime), userid. METHOD: POST <br>
http://localhost:8001/api/event/{id} <br>
//Event güncelleme. title, description, date(unixtime), userid. METHOD: PUT <br>
http://localhost:8001/api/event/{id} <br>
//Event sil. METHOD: DELETE <br>








