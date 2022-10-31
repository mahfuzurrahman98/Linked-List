<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ShopAPIController extends Controller {
  protected $imagePath = 'uploads/card_images/';

  public function getShopTheme($id) {
    $style = DB::table('themes')
      ->where('shop_id', '=', $id)
      ->first('json');

    return $style;
    // if (!$style) {
    //   DB::table('themes')->insert([
    //     'shop_id' => $id,
    //     'json' => '{"color":"#000","bgColor":{"color1":"#FFF9F3","color2":"#8ab1ff"},"fontFamily":"ubuntu","bgColorType":"solid"}'
    //   ]);
    //   return DB::table('themes')
    //     ->where('shop_id', '=', $id)
    //     ->first('json');
    // } else {
    //   return $style;
    // }
  }

  public function getShopData($id) {
    $data = DB::table('companies')
      ->where('companies.id', '=', $id)
      ->first(['name', 'description', 'subdomain']);

    $data->value = "";
    $logo = DB::table('configs')
      ->where('configs.model_id', '=', $id)
      ->where('key', '=', 'resto_wide_logo')
      ->first('value');

    if ($logo) {
      if (file_exists(public_path() . '/uploads/restorants/' . $logo->value . '_original.png')) {
        $data->value = $logo->value . '_original.png';
      } else if (file_exists(public_path() . '/uploads/restorants/' . $logo->value . '_original.jpg')) {
        $data->value = $logo->value . '_original.jpg';
      } else if (file_exists(public_path() . '/uploads/restorants/' . $logo->value . '_original.jpeg')) {
        $data->value = $logo->value . '_original.jpeg';
      } else {
        $data->value = "";
      }
    }
    return $data;
  }
  
  public function getShopItems($id) {
    $cats = DB::table('categories')->where('restorant_id', '=', $id)->get();
    // $restorant = Restorant::findOrFail($id);
    return $cats;
  }

  public function getShopLinks($id) {
    return DB::table('card_links')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopImagesUploaded($id) {
    return DB::table('card_images_uploaded')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopImages($id) {
    return DB::table('card_images')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopVideos($id) {
    return DB::table('card_videos')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopContacts($id) {
    return DB::table('card_contacts')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopFaqs($id) {
    return DB::table('card_faqs')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopDescriptions($id) {
    return DB::table('card_descriptions')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getAllImages($id) {
    return DB::table('card_images_uploaded')
      ->where('shop_id', '=', $id)
      ->get();
  }

  public function getShopView($id) {
    return DB::table('shop_view')
      ->where('shop_id', '=', $id)
      ->first()
      ->view;
  }

  public function getShopText($id) {
    return DB::table('online_shop_text')
      ->where('shop_id', '=', $id)
      ->first();
  }

  public function getShopCards($id) {
    $cards = DB::table('cards')
      ->where('shop_id', '=', $id)
      ->orderBy('position_id')
      ->get();

    return $cards;
    // if (count($cards) == 0) {
    //   // echo "no cards available";
    //   DB::table('cards')->insert([
    //     'shop_id' => $id,
    //     'props_id' => 0,
    //     'position_id' => 0,
    //     'type' => 0,
    //     'active' => 1,
    //     'deleted' => 0
    //   ]);
    //   return DB::table('cards')
    //     ->where('shop_id', '=', $id)
    //     ->orderBy('position_id')
    //     ->get();
    // } else {
    //   // echo "there are cards";
    //   return $cards;
    // }
  }

  public function uploadImages(Request $req, $id) {

    // return $req->all();

    if ($req->hasFile('u_image')) {
      $uuid = Str::uuid()->toString();
      $req->u_image->move(public_path($this->imagePath), $uuid . '_card.png');
      DB::table('card_images_uploaded')
        ->insert(
          ['shop_id' => $id, 'image' => $uuid . '_card.png']
        );
    }
  }

  public function updateShopTheme(Request $req, $id) {
    $json = $req->all();
    // return $json;
    DB::table('themes')
      ->where('shop_id', $id)
      ->update(
        ['json' => $json]
      );
    return "updated";
  }

  public function updateShopLinks(Request $req, $id) {
    $links = $req->all();
    var_dump($links);

    foreach ($links as $key => $link) {
      DB::table('card_links')
        ->updateOrInsert(
          ['shop_id' => $link['shopId'], 'props_id' => $link['propsId']],
          ['title' => $link['title'], 'value' => $link['value']]
        );
    }
  }

  public function updateShopVideos(Request $req, $id) {
    // return $req;
    $videos = $req->all();
    foreach ($videos as $key => $video) {
      DB::table('card_videos')
        ->updateOrInsert(
          ['shop_id' => $video['shopId'], 'props_id' => $video['propsId']],
          ['title' => $video['title'], 'value' => $video['value']]
        );
    }
  }

  public function updateShopContacts(Request $req, $id) {
    // return $req;
    $contacts = $req->all();
    foreach ($contacts as $key => $contact) {
      DB::table('card_contacts')
        ->updateOrInsert(
          ['shop_id' => $contact['shopId'], 'props_id' => $contact['propsId']],
          ['value' => $contact['value']]
        );
    }
  }

  public function updateShopFaqs(Request $req, $id) {
    // return $req;
    $faqs = $req->all();
    foreach ($faqs as $key => $faq) {
      DB::table('card_faqs')
        ->updateOrInsert(
          ['shop_id' => $faq['shopId'], 'props_id' => $faq['propsId']],
          ['question' => $faq['question'], 'answer' => $faq['answer']]
        );
    }
  }

  public function updateShopDescriptions(Request $req, $id) {
    // return $req;
    $descripions = $req->all();
    foreach ($descripions as $key => $descripion) {
      DB::table('card_descriptions')
        ->updateOrInsert(
          ['shop_id' => $descripion['shopId'], 'props_id' => $descripion['propsId']],
          ['title' => $descripion['title'], 'value' => $descripion['value']]
        );
    }
  }

  public function updateShopImages(Request $req, $id) {
    $images = $req->all();
    // return $images;

    foreach ($images as $key => $image) {
      DB::table('card_images')
        ->updateOrInsert(
          ['shop_id' => $image['shopId'], 'props_id' => $image['propsId']],
          ['title' => $image['title'], 'value' => $image['value']]
        );
    }
  }

  public function updateShopView(Request $req, $id) {
    return DB::table('shop_view')
      ->where('shop_id', '=', $id)
      ->update(['view'=> $req->view]);
  }

  public function updateShopText(Request $req, $id) {
    return DB::table('online_shop_text')
      ->where('shop_id', '=', $id)
      ->update(['text'=> $req->text]);
  }

  public function updateShopCards(Request $req, $id) {
    // return $req;
    $cards = $req->all();
    // return $cards;

    foreach ($cards as $key => $card) {
      if ($card['deleted']) {
        // var_dump($card);
        $temp_card = DB::table('cards')
          ->where('shop_id', '=', $card['shopId'])
          ->where('type', '=', $card['typeId'])
          ->where('props_id', '=', $card['propsId'])
          ->first();

        if ($temp_card) {
          $isDeleted = DB::table('cards')
            ->where('shop_id', '=', $card['shopId'])
            ->where('type', '=', $card['typeId'])
            ->where('props_id', '=', $card['propsId'])
            ->delete();
          echo "isDeleted: " . $isDeleted . " x<br>";

          $table_name = '';
          if ($card["typeId"] == 1) {
            $table_name = 'card_links';
          } else if ($card["typeId"] == 2) {
            $table_name = 'card_images';
          } else if ($card["typeId"] == 3) {
            $table_name = 'card_videos';
          } else if ($card["typeId"] == 4) {
            $table_name = 'card_contacts';
          } else if ($card["typeId"] == 6) {
            $table_name = 'card_descriptions';
          }

          $isDeleted2 = DB::table($table_name)
            ->where('shop_id', '=', $card['shopId'])
            ->where('props_id', '=', $card['propsId'])
            ->delete();
          echo "isDeleted2: " . $isDeleted2 . " x<br>";
        }
      } else {
        DB::table('cards')
          ->updateOrInsert(
            ['shop_id' => $card['shopId'], 'type' => $card['typeId'], 'props_id' => $card['propsId']],
            ['position_id' => $card['positionId'], 'active' => $card['active'], 'deleted' => $card['deleted']]
          );
      }
    }
  }

  public function updateShopImagesPrev(Request $req, $id) {
    $props_ids = $req->propsIds;
    $images = $req->vals;
    $titles = $req->titles;
    $len = count($titles);
    echo "img len: " . count($images) . ", actual len: " . $len . "\n";
    var_dump($images);

    // for ($i = 0; $i < $len; $i++) {
    //   echo "at: " . $i . ": ";
    //   echo gettype($images[$i]) . "\n";
    // if (!empty($images[$i])) {
    //   // var_dump($images[$i]);
    //   echo "ache" . "\n";
    // }
    // }
    return;

    echo "images length: " . count($images) . "\n";
    for ($i = 0; $i < $len; $i++) {
      $props_id = $props_ids[$i];
      $title = $titles[$i];

      $uuid = Str::uuid()->toString();

      $exists = DB::table('card_images')
        ->where('shop_id', '=', $id)
        ->where('props_id', '=', $props_id)
        ->exists();
      echo "at: " . $i . "\n";
      if ($exists) { // update
        // update title
        DB::table('card_images')
          ->where('shop_id', '=', $id)
          ->where('props_id', '=', $props_id)
          ->update(['title' => $title]);

        if (array_key_exists($i, $images)) { // new image
          $image = $images[$i];
          var_dump($image);
          // $image->move(public_path($this->imagePath), $uuid . '.png');
          // DB::table('card_images')
          //     ->where('shop_id', '=', $id)
          //     ->where('props_id', '=', $props_id)
          //     ->update(['value' => $uuid . '.png']);
        }
      } else { // simply insert
        DB::table('card_images')
          ->insert(
            ['shop_id' => $id, 'props_id' => $props_id, 'title' => $title, 'value' => $uuid . '.png']
          );
      }
    }
  }

  public function insertCards() {
    for ($i = 1; $i < 86; $i++) {
      DB::table('cards')->insert([
        'shop_id' => $i,
        'props_id' => 0,
        'position_id' => 0,
        'type' => 0,
        'active' => 1,
        'deleted' => 0
      ]);
    }
  }

  public function testDel() {
    // return "ddd";
    $isDeleted2 = DB::table('card_links')
      ->where('shop_id', '=', 19)
      ->where('props_id', '=', 3)
      ->delete();
    echo "isDeleted2: " . $isDeleted2 . " x<br>";
  }

  public function insertIntoShopView() {
    // return "ddd";
    for ($i = 1; $i <= 228; $i++) {
      DB::table('online_shop_text')
        ->insert(
          ['shop_id' => $i, 'text' => 'Online Shop']
        );
    }
  }
}
