<?php

/**
 * Plugin Name: Binary MLM Plan
 * Plugin URI:  https://www.mlmtrees.com/product/bmp-pro-wordpress/
 * Description: Binary MLM Plan with ePin is a plug-and-play plugin which helps to manage binary networks within WordPress. Binary MLM Plan Software is suitable for all MLM organizations.
 * Version: 5.1
 * Author: LetsCMS
 * Author URI: https://letscms.com
 * Text Domain: binary-mlm-plan
 * License: GPL-2.0 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 6.0.2
 * Tested up to: 6.9
 * Requires PHP: 8.0
 *
 * @package BMP
 */


if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define BMP_PLUGIN_FILE.
if (!defined('BMP_PLUGIN_FILE')) {
    define('BMP_PLUGIN_FILE', __FILE__);
}

// Include the main WooCommerce class.
if (!class_exists('binary-mlm-plan')) {
    include_once dirname(__FILE__) . '/includes/class-bmp.php';
}


function BMP()
{
    return Bmp::instance();
}

// Global for backwards compatibility.
$GLOBALS['bmp'] = BMP();
