<?php

$data = [-20, 0.60, 1, 2, 3, 4, 5, 6];

// 1
$min = $data[0];
foreach ($data as $key => $value) {
  if ($value < $min) {
    $min = $value;
  }
}
echo $min;

// 2
$max = $data[0];
foreach ($data as $key => $value) {
  if ($value > $max) {
    $max = $value;
  }
}
echo $max;


// 3
$sum = 0;
foreach ($data as $key => $value) {
  $sum += $value;
}
echo $sum;

// 4
echo round($data[1]);

// 5
echo $data[0] < 0 ? (-1) * $data[0] : $data[0];

// 6
echo rand(100, 999);

// 7
// assending
usort($data, function ($a, $b) {
  if ($a == $b) {
    return 0;
  }
  return ($a < $b) ? -1 : 1;
});

print_r($data);

// descending
usort($data, function ($a, $b) {
  if ($a == $b) {
    return 0;
  }
  return ($a < $b) ? -1 : 1;
});

print_r($data);
