<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ShopAPIController extends Controller {
  protected $imagePath = 'uploads/card_images/';

  public function getShopTheme($id) {
    $style = DB::table('themes')
      ->where('user_id', '=', $id)
      ->first('json');

    return $style;
  }

  public function getShopLinks($id) {
    return DB::table('card_links')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopImagesUploaded($id) {
    return DB::table('card_images_uploaded')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopImages($id) {
    return DB::table('card_images')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopVideos($id) {
    return DB::table('card_videos')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopContacts($id) {
    return DB::table('card_contacts')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopDescriptions($id) {
    return DB::table('card_descriptions')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getAllImages($id) {
    return DB::table('card_images_uploaded')
      ->where('user_id', '=', $id)
      ->get();
  }

  public function getShopCards($id) {
    $cards = DB::table('cards')
      ->where('user_id', '=', $id)
      ->orderBy('position_id')
      ->get();

    return $cards;
  }

  public function uploadImages(Request $req, $id) {

    if ($req->hasFile('u_image')) {
      $uuid = Str::uuid()->toString();
      $req->u_image->move(public_path($this->imagePath), $uuid . '_img.png');
      DB::table('card_images_uploaded')
        ->insert(
          ['user_id' => $id, 'image' => $uuid . '_img.png']
        );
    }
  }

  public function updateShopTheme(Request $req, $id) {
    $json = $req->all();
    // return $json;
    DB::table('themes')
      ->where('user_id', $id)
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
          ['user_id' => $link['userId'], 'props_id' => $link['propsId']],
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
          ['user_id' => $video['userId'], 'props_id' => $video['propsId']],
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
          ['user_id' => $contact['userId'], 'props_id' => $contact['propsId']],
          ['value' => $contact['value']]
        );
    }
  }

  public function updateShopDescriptions(Request $req, $id) {
    // return $req;
    $descripions = $req->all();
    foreach ($descripions as $key => $descripion) {
      DB::table('card_descriptions')
        ->updateOrInsert(
          ['user_id' => $descripion['userId'], 'props_id' => $descripion['propsId']],
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
          ['user_id' => $image['userId'], 'props_id' => $image['propsId']],
          ['title' => $image['title'], 'value' => $image['value']]
        );
    }
  }

  public function updateShopText(Request $req, $id) {
    return DB::table('online_shop_text')
      ->where('user_id', '=', $id)
      ->update(['text' => $req->text]);
  }

  public function updateShopCards(Request $req, $id) {
    // return $req;
    $cards = $req->all();
    // return $cards;

    foreach ($cards as $key => $card) {
      if ($card['deleted']) {
        // var_dump($card);
        $temp_img = DB::table('cards')
          ->where('user_id', '=', $card['userId'])
          ->where('type', '=', $card['typeId'])
          ->where('props_id', '=', $card['propsId'])
          ->first();

        if ($temp_img) {
          $isDeleted = DB::table('cards')
            ->where('user_id', '=', $card['userId'])
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
            ->where('user_id', '=', $card['userId'])
            ->where('props_id', '=', $card['propsId'])
            ->delete();
          echo "isDeleted2: " . $isDeleted2 . " x<br>";
        }
      } else {
        DB::table('cards')
          ->updateOrInsert(
            ['user_id' => $card['userId'], 'type' => $card['typeId'], 'props_id' => $card['propsId']],
            ['position_id' => $card['positionId'], 'active' => $card['active'], 'deleted' => $card['deleted']]
          );
      }
    }
  }
}
